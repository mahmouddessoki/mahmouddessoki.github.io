import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms"
import {AuthenticationService} from "../services/authentication.service"
import {Router} from "@angular/router"
import { Observable } from 'rxjs';
declare var $ : any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  mySignUpForm : any;
  checked : boolean = false;
  checkedResponse : boolean = false;
  response : any;
  constructor(private _AuthenticationService : AuthenticationService,private _Router : Router) {
    this.mySignUpForm = new FormGroup({
      "first_name" : new FormControl(null,[Validators.required,Validators.pattern("^[A-z]{3,10}$")]),
      "last_name" : new FormControl(null,[Validators.required,Validators.pattern("^[A-z]{3,10}$")]),
      "age" : new FormControl(null,[Validators.required,Validators.min(20)]),
      "email" : new FormControl(null,[Validators.email,Validators.required]),
      "password" : new FormControl(null,[Validators.pattern("^[A-Z][0-9]{3}"),Validators.required])

    })
   }

  ngOnInit(): void {
    $('#particle').particleground();
  }

  signUpData(signUpForm : any)
  {
    this.checked = true;
    this._AuthenticationService.signUp(signUpForm.value).subscribe((data)=>{
      this.checkedResponse = true;
      this.response = data.message;
      if(data.message == "success")
      {
        this.checked = false;
        this._Router.navigate(['/signin']);
      }
      
    })
  }

  
}
