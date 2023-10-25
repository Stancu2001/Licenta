import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-add-news-modal',
  templateUrl: './add-news-modal.component.html',
  styleUrls: ['./add-news-modal.component.scss'],
})
export class AddNewsModalComponent {
  title: string;
  content: string;

  constructor(
    private genericService: GenericService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<AddNewsModalComponent>
  ) {}

  onSubmit() {
    this.genericService
      .createNews({
        title: this.title,
        content: this.content,
      })
      .subscribe((data) => {
        console.log(data);
        this.eventService.emit("News_Add");
        this.dialogRef.close();
      });
  }
}
