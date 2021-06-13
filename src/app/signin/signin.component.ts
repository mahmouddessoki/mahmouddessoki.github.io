import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms"
import {AuthenticationService} from "../services/authentication.service"
import {Router} from "@angular/router"
declare var $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  myLoginForm : any;
  checked : boolean = false;
  checkedResponse : boolean = false;
  response : any;
  
  constructor(private _AuthenticationService : AuthenticationService,private _Router : Router) {
    
    this.myLoginForm = new FormGroup({
      "email" : new FormControl('',[Validators.email,Validators.required]),
      "password" : new FormControl('',[Validators.pattern("^[A-Z][0-9]{3}"),Validators.required])

    })

    
   }

  ngOnInit(): void {
    $('#particle').particleground();
  }

  LoginData(LoginForm : any){
    this.checked = true;
      this._AuthenticationService.signIn(LoginForm.value).subscribe((data)=>{
        
        this.checkedResponse = true;
        this.response = data.message;
        if(data.message == "success")
        {
          this._AuthenticationService.saveUserData(data.user);
          localStorage.setItem("userToken",data.token)
          this.checked = false;
          this._Router.navigate(['/note'])
          this._AuthenticationService.isLOgin.next(false);
        }
      })
  }

}
