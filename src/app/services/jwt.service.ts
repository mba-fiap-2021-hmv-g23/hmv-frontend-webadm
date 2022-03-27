import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  private accessToken = null;

  constructor(private http: HttpClient, private router: Router) {}

  async validateToken(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      const item = await localStorage.getItem('auth');

      if (item) {
        const { accessToken, refreshToken, expiresIn } = JSON.parse(item);

        if (moment(expiresIn).diff(moment(), 'minute') <= 0) {
          return await this.http
            .post(`${environment.api}/refresh-token`, {
              refreshToken: refreshToken,
            })
            .toPromise()
            .then(async (newAuth) => {
              if (item) {
                const auth = { ...JSON.parse(item), ...newAuth };
                await localStorage.setItem('auth', JSON.stringify(auth));
                this.accessToken = auth.accessToken;
              }
            });
        }

        this.accessToken = accessToken;
      }

      resolve();
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === `${environment.api}/refresh-token`) return next.handle(req);

    return from(this.validateToken()).pipe(
      switchMap(() => {
        if (this.router.url !== '/login') {
          const header = req.clone({
            headers: req.headers
              .set('Authorization', `Bearer ${this.accessToken}`)
              .append('Access-Control-Allow-Origin', '*'),
          });

          return next.handle(header);
        }

        return next.handle(req);
      })
    );
  }
}
