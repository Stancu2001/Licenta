import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericService } from 'src/app/services/generic.service';
import { AddNewsModalComponent } from './add-news-modal/add-news-modal.component';
import { EventService } from 'src/app/services/event.service';
import { EditNewsModalComponent } from './edit-news-modal/edit-news-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  panelOpenState = false;
  news;

  constructor(
    public auth:AuthService,
    private generic: GenericService,
    private dialog: MatDialog,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getNews();

    this.eventService
      .on('News_Add')
      .subscribe((data: any) => this.NewsAdd(data));

    this.eventService
      .on('News_Edit')
      .subscribe((data: any) => this.NewsAdd(data));
  }

  add() {
    this.dialog.open(AddNewsModalComponent);
  }

  getNews() {
    this.generic.getNews().subscribe((data) => {
      this.news = data;
    });
  }

  NewsAdd(data: any) {
    this.getNews();
  }

  NewsEdit(data: any) {
    this.getNews();
  }

  delete(id: number) {
    this.generic.deleteNews(id).subscribe(() => {
      this.getNews();
    });
  }

  edit(data:any) {
    this.dialog.open(EditNewsModalComponent,{data:data});
  }
}
