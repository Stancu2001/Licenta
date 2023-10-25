import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import { EdithomeComponent } from './edithome/edithome.component';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content: string = '';
  title:string="";


  constructor(private genericService: GenericService,
    private router: Router, 
    private matdialog: MatDialog,
    private eventService:EventService,
    public auth:AuthService
    ) { }
  ngOnInit(): void {
    this.getcontent();
    this.eventService.on('onHome_ADD').subscribe((data) => this.getcontent());
  }
  

  getcontent(){
    
    this.genericService.getHome().subscribe({
      next:(data:any)=>{
        this.title=data[0].title;
        this.content=data[0].content;
      },
      error:e=>{

      }
    })
  }
  open(){
    const dialog_ref = this.matdialog.open(EdithomeComponent, {
      data: {
        title: this.title,
        content:this.content
      },
    });
  }
}
