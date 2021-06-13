import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(private _Router :Router) { }

  ngOnInit(): void {
  }
  getProfile() :void{
    this._Router.navigate(['/note'])
  }
}
