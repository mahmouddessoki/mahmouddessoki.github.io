import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./services/authentication.service"
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class PathGuard implements CanActivate {
  constructor(private _AuthenticationService : AuthenticationService,private _Router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem("userToken")){
      return true;
    }
    else{
      this._Router.navigate(['/signin'])
      return false;
    }
  }
  
}
