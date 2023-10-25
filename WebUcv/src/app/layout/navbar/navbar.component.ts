import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  titlePrimary: string = 'Departamentul de Informatica';
  titleSecondary: string = 'Facultatea de Stiinte';

  constructor(private dialog: MatDialog,public auth:AuthService) {}

  login() {
    const dialogRef = this.dialog.open(LoginComponent);
  }
  logout(){
    this.auth.logout();
  }
}
