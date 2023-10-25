import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  login(data: { username: string; password: string }) {
    return this.httpClient.post(`${this.apiUrl}/api/auth/signin`, data);
  }
  public isLoggedIn(): boolean {
    const user = localStorage.getItem("Token");
    if (user) {
      return true;
    }

    return false;
  }
  logout(){
    localStorage.removeItem("Token");
  }
}
