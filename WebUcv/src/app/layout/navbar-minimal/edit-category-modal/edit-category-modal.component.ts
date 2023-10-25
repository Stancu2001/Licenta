import { Component, Input, Inject, Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss']
})
export class EditCategoryModalComponent {
  title:string=""
  constructor(private genericservice:GenericService, 
    private matdialog:MatDialogRef<EditCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private toastr:ToastrService,
    private eventService: EventService,
    ){this.title=data.title}

  onSubmit(){
    this.genericservice.editCategorybyId(this.data.id,{title:this.title}).subscribe({
      next:(data)=> {
        this.matdialog.close(1);
        this.toastr.success("Categoria a primit update cu succes");
        this.eventService.emit("onCategory_Update",data);
      },error:data =>this.matdialog.close(0)
    })
  }
}
