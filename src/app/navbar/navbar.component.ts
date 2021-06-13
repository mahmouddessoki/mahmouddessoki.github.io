import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service"
import {Router} from "@angular/router"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin : any;
  constructor(private  _AuthenticationService : AuthenticationService,private _Router:Router) {
    this._AuthenticationService.isLOgin.subscribe((res)=>{
      this.isLogin = res;
    }) 

  }

  ngOnInit(): void {
  }

  logOut()
  {
    localStorage.removeItem("userToken");
    this._Router.navigate(['/signin'])
    this._AuthenticationService.isLOgin.next(true);
  }

}
