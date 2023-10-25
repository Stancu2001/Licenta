import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import quill from 'quill';
import Quill from 'quill';
import { EditSubcategoryModalComponent } from 'src/app/layout/navbar-minimal/edit-subcategory-modal/edit-subcategory-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-page-handler',
  templateUrl: './page-handler.component.html',
  styleUrls: ['./page-handler.component.scss'],
})

export class PageHandlerComponent implements OnInit {
  data:any

  constructor(
    public auth:AuthService,
    private route: ActivatedRoute,
    private router:Router,
    private genericService: GenericService, 
    private toast: ToastrService,
    private eventService: EventService,
    private matdialog: MatDialog  ) {}
    @Input() id: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      var path = paramMap.get('name');

      this.genericService
        .getSubCategoryByName(path!)
        .subscribe({
          next:(data: any) => {
            this.data = data;
          }
          ,error:(e:any)=>this.router.navigate([""])
        });
    });
  }
  updateSubcategory() {
    const dialog_ref = this.matdialog.open(EditSubcategoryModalComponent, {
      data: this.data
    });
    // dialog_ref.componentInstance.onDelete.subscribe((data) => {
    //   this.onEdit.emit();
    // });
  }
  deleteSubcategory(){
    this.genericService.deleteSubcategory(this.data.id).subscribe((data) => {
      this.toast.success("Subcategoria a fost stearsa");
      this.router.navigate([""]);
      this.eventService.emit("onSubcategory_Delete",data);
    });
  }
}
