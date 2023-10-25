import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/services/generic.service';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { EventService } from 'src/app/services/event.service';
import { AddSubcategoryModalComponent } from './add-subcategory-modal/add-subcategory-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { EditSubcategoryModalComponent } from './edit-subcategory-modal/edit-subcategory-modal.component';

@Component({
  selector: 'navbar-minimal',
  templateUrl: './navbar-minimal.component.html',
  styleUrls: ['./navbar-minimal.component.scss'],
})
export class NavbarMinimalComponent implements OnInit {
  datas2: any[] = [{title: 'News', subcategories: [],link:"/news",admin:false},
 {title: 'Upload File', subcategories: [],link:"/file",admin:true}
];
datas:any[]

  constructor(
    public auth:AuthService,
    private genericService: GenericService,
    private matdialog: MatDialog,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getcategory();

    this.eventService.on('onCategory_Add').subscribe((data) => this.onCategoryAdd(data));
    this.eventService.on('onCategory_Update').subscribe((data) => this.onCategoryUpdate(data));
    this.eventService.on('onCategory_Delete').subscribe((data) => this.onCategoryDelete(data));
    this.eventService.on('onSubCategory_Add').subscribe((data) => this.onSubCategoryAdd(data));
    this.eventService.on('onSubCategory_Update').subscribe((data) => this.onSubCategoryUpdate(data));
    this.eventService.on('onSubcategory_Delete').subscribe((data) => this.onSubCategoryDelete(data));

  }

  onCategoryAdd(data: any) {
    var dialog = this.matdialog.open(AddCategoryModalComponent, {
      width: '500px',
    });
    dialog.afterClosed().subscribe((data) => {
      if (data == 1) {
        this.getcategory();
      }
    });
  }
  onCategoryUpdate(data: any) {
        this.getcategory();
  }
  onCategoryDelete(data: any) {
    this.getcategory();
  }

  onSubCategoryUpdate(data:any){
    this.getcategory();
    //window.location.reload();
  }
  
  onSubCategoryAdd(data: any){
      this.getcategory();
 }

  getcategory() {
    this.genericService.getAllCategory().subscribe((data: any) => {
      var aux:any[]=[];
      this.datas=[];
      data.forEach((element: any) => {
        aux.push({
          id: element.id,
          title: element.title,
          subcategories: element.subcategories,
        });
      });
      // aux=aux.concat(this.datas2)
      // //  this.datas2=aux
      //  this.datas=aux
      this.datas = aux.concat(this.datas2);
       console.log(data)
      console.log(aux);
    });
    
  }

  AddCategory() {
    var dialog = this.matdialog.open(AddCategoryModalComponent, {
      width: '500px',
    });
    dialog.afterClosed().subscribe((data) => {
      if (data == 1) {
        this.getcategory();
      }
    });
  }

  
  
  onSubCategoryAdded() {
    var dialog = this.matdialog.open(AddSubcategoryModalComponent, {
      width: '500px',
    });
    dialog.afterClosed().subscribe((data) => {
      if (data == 1) {
        this.getcategory();
      }
    });
  }
  onSubCategoryDelete(data:any) {
    this.getcategory();
  }
}
