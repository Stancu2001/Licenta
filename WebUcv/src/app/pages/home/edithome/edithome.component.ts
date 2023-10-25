import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-edithome',
  templateUrl: './edithome.component.html',
  styleUrls: ['./edithome.component.scss']
})
export class EdithomeComponent implements OnInit {
  id:number;
  title:string;
  content:string;
  constructor(private genericService: GenericService, 
    private router:Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private matdialog: MatDialogRef<EdithomeComponent>,
    private genericservice:GenericService,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data:any,){}
  ngOnInit(): void 
  {
    this.title=this.data.title;
    this.content=this.data.content;
  }
  onSubmit(){
    this.genericservice.createHome({title:this.data.title, content:this.data.content}).subscribe({
      next:(data)=> {
        this.matdialog.close(1);
        this.toastr.success("Continut modificar cu succes");
         this.eventService.emit("onHome_ADD",data);
        this.router.navigate([""])
      },error:data => {
        this.matdialog.close(0)
        this.data.title=this.title;
        this.data.content=this.content;
      }
    })
  }
}
