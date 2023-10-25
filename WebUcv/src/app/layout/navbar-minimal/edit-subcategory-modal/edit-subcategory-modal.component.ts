import { Component, Input, Inject, Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-edit-subcategory-modal',
  templateUrl: './edit-subcategory-modal.component.html',
  styleUrls: ['./edit-subcategory-modal.component.scss']
})
export class EditSubcategoryModalComponent {
  content:string=""
  title:string=""
  constructor(private genericservice:GenericService, 
    private matdialog:MatDialogRef<EditSubcategoryModalComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toastr:ToastrService,
    private eventService: EventService,
    ){
      this.content=data.content;
      this.title=data.title;
    }
  onSubmit(){
    this.genericservice.editSubcategoryContentById(this.data.id,{id:this.data.id,title:this.data.title, content:this.data.content}).subscribe({
      next:(data)=> {
        this.matdialog.close(1);
        this.toastr.success("subcategoria a primit update cu succes");
        this.eventService.emit("onSubCategory_Update",data);
        this.router.navigate(["/page",this.data.title])
      },error:data => {
        this.matdialog.close(0)
        this.toastr.error("Subcaregoria nu a putut primi update")
        this.data.title=this.title;
        this.data.content=this.content;
      }
    })
  }
}
