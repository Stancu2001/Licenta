import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  displayedColumns: string[] = ['filName', 'filUrl','Link'];
  page!: number;
  page1!:number;
  page2!:number;
  selectedFile: File[]=[];
  allfile:any[] = [];
  fileData: { filName: string, filUrl: string }[] = [];
  fileName: string = '';
  fileUrl: string = '';
  responseMessage: string = '';
  private baseUrl="http://localhost:8080";
  constructor(private http: HttpClient) { }

  onFileChange(event: any) {
    this.selectedFile = event.target.files;

  }
   replaceCharacter(str: string, charToReplace: string, replacementChar: string): string {
    return str.replace(new RegExp(charToReplace, 'g'), replacementChar);
  }
  uploadFile() {
    //window.location.reload();
    if (this.selectedFile.length === 0) {
      alert('Nu s-au selectat fișiere.');
      return;
    }

    let formData = new FormData();
    for (let i = 0; i < this.selectedFile.length; i++) {
      formData.append('file', this.selectedFile[i]);
    }
    console.log(formData);
    this.http.post<any[]>(`${this.baseUrl}`+'/api/upload', formData).subscribe(
      response => {
        this.fileData.splice(0);
        response.forEach((item: string) => {
          // Separă numele fișierului și URL-ul utilizând metoda split()
          const parts = item.split(' poate vizualizat la: ');
    
          if (parts.length === 2) {
            const fileName = parts[0]; // Numele fișierului
            const fileUrl = parts[1]; // URL-ul fișierului
            this.fileData.push({ filName: fileName, filUrl: fileUrl });
      }
    });
      },
      error => {
        console.error('Eroare:', error);
        this.responseMessage = 'Eroare la încărcarea fișierului!';
      }
    );
  }
  getallfile(){
    this.http.get<any[]>(`${this.baseUrl}`+'/api/view',).subscribe(
      response => {
        this.allfile = response;
        console.log(this.allfile);
      },
      error => {
        console.error('Eroare:', error);
        // Tratați eroarea aici, cum ar fi afișarea unui mesaj de eroare
      }
    );
  }
  pagechange(event:any){
    this.page=event;
   }
  pagechange1(event1:any){
    this.page1=event1;
   } 
   pagechange2(event2:any){
    this.page2=event2;
   } 

}
