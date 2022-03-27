import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const item = await localStorage.getItem('auth');

    if (state.url === '/login' && item) {
      this.router.navigateByUrl('/home');
      return false;
    } else if (state.url === '/home' && item === null) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
