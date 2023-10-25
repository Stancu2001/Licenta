import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/services/generic.service';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';
import { AddSubcategoryModalComponent } from '../add-subcategory-modal/add-subcategory-modal.component';
import { Router } from '@angular/router';
import { EditSubcategoryModalComponent } from '../edit-subcategory-modal/edit-subcategory-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'navar-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  constructor(
    public auth:AuthService,
    private genericservice: GenericService,
    private toast: ToastrService,
    private matdialog: MatDialog,
    private router: Router,
    private eventService: EventService,
  ) {}
  @Input() title: string;
  @Input() options: string[];
  @Input() link:string;
  @Input() id: number;


  update() {
    const dialog_ref = this.matdialog.open(EditCategoryModalComponent, {
      data: {
        id: this.id,
        title: this.title,
      },
    });
  }

  delete() {
    this.genericservice.deleteCategorybyId(this.id).subscribe((data) => {
      this.toast.success(data['mesaj']);
      this.eventService.emit("onCategory_Delete",data)
    });
  }

  add() {
    const dialog_ref = this.matdialog.open(AddSubcategoryModalComponent, {
      data: {
        id: this.id,
      },
    });
  }
  
  optionClick(data: any) {
    this.router.navigate(['page', data]);
  }
  CategoryClick(){
    this.router.navigate([`page/${this.link}`])
    console.log(this.link);
  }
}
