import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formData = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]), 
  });
  errorMessage="";
  isLoginFailed=false;
  minlength=6;
  constructor(private authService: AuthService,private matdialog:MatDialogRef<LoginComponent>) {}

  login() {
    if(!this.formData.valid) {
      
      return;
    }

    // this.authService.login({
    //   username: this.formData.controls.username.value!,
    //   password: this.formData.controls.password.value!
    // }).subscribe((data)=>{
    //   localStorage.setItem("Token",data["accessToken"]);
    //   this.matdialog.close(1);
    // })
    this.authService.login({
      username: this.formData.controls.username.value!,
      password: this.formData.controls.password.value!
    }).subscribe({
      next: data =>{
        localStorage.setItem("Token",data["accessToken"]);
        this.matdialog.close(1);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }
}
