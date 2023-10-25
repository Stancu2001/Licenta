import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { GenericService } from 'src/app/services/generic.service';
import { AddNewsModalComponent } from '../add-news-modal/add-news-modal.component';

@Component({
  selector: 'app-edit-news-modal',
  templateUrl: './edit-news-modal.component.html',
  styleUrls: ['./edit-news-modal.component.scss'],
})
export class EditNewsModalComponent {
  title: string;
  content: string;

  constructor(
    private genericService: GenericService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<EditNewsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) {}

  onSubmit() {
    this.genericService
      .createNews({
        id:this.data.id,
        title: this.data.title,
        content: this.data.content,
      })
      .subscribe((data) => {
        console.log(data);
        this.eventService.emit('News_Edit');
        this.dialogRef.close();
      });
  }
}
