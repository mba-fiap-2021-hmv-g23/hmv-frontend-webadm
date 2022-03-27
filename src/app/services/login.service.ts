import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(login: string, password: string): Promise<void> {
    return this.http
      .post(`${environment.api}/login`, { login, password })
      .toPromise()
      .then(async (auth) => {
        await localStorage.setItem('auth', JSON.stringify(auth));
        await this.router.navigateByUrl('/home');
      });
  }

  async logout() {
    await localStorage.removeItem('auth');
    await this.router.navigateByUrl('/login');
  }
}
