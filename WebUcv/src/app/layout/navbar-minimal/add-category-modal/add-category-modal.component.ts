import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GenericService } from 'src/app/services/generic.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
})
export class AddCategoryModalComponent {
  title: any;

  constructor(
    private genericservice: GenericService,
    private matdialog: MatDialogRef<AddCategoryModalComponent>,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    console.log(this.title);
    this.genericservice.createCategory({ title: this.title }).subscribe({
      next: (data) => {
        this.matdialog.close(1);
        this.toastr.success('Categorie adaugata cu succes');
      },
      error: (data) => this.matdialog.close(0),
    });
  }
}
