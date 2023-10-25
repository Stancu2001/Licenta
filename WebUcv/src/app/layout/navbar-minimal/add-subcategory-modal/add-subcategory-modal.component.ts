import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-add-subcategory-modal',
  templateUrl: './add-subcategory-modal.component.html',
  styleUrls: ['./add-subcategory-modal.component.scss'],
})
export class AddSubcategoryModalComponent {
  title: string;

  constructor(
    private genericservice: GenericService,
    private toastr: ToastrService,
    private eventService: EventService,
    private router:Router,
    private matdialog: MatDialogRef<AddSubcategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
   
  ) {}

  onSubmit(){
    this.genericservice.createSubcategory(this.data.id,{title:this.data.title, content:this.data.content}).subscribe({
      next:(data)=> {
        //console.log(this.data.id);
        this.matdialog.close(1);
        this.toastr.success("subcategoria a fost adaugata cu succes");
        this.router.navigate(["/page",this.data.title])
        //window.location.reload();
        this.eventService.emit("onSubCategory_Add",data);
      },error:data =>{ this.matdialog.close(0);
        this.toastr.error("Titlul exista deja");
      }
    })
  }
}
