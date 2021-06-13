import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Observable, observable,BehaviorSubject} from 'rxjs'
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   userData : any;
   isLOgin = new BehaviorSubject<any>(true);
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
   if(localStorage.getItem("userToken") != null)
   {
      let path = window.location.pathname;
      this._Router.navigate([path])
   }    

   
   }

   
   signUp(signUpData):Observable<any>
   {
      return this._HttpClient.post("https://routeegypt.herokuapp.com/signup",signUpData);  
   }
   signIn(signInData):Observable<any>
   {
      return this._HttpClient.post("https://routeegypt.herokuapp.com/signin",signInData);  
   }

   saveUserData(userData : any){
      this.userData = userData;
      console.log(this.userData)
   }
}
