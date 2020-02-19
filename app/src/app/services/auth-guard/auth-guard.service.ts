import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTOKEN } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private readonly router: Router, 
              private readonly activeRoute: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const jwt = localStorage.getItem(JWTOKEN);
    if(jwt)
      return true;
    else{
      const extras: NavigationExtras = { queryParams: { returnUrl: state.url }}
      this.router.navigate(['/sign-in'], extras);
    }

  }
}
