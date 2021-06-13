import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from "@angular/forms"
import { AuthenticationService } from '../services/authentication.service';
import  {NoteService} from "../services/note.service"
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
declare var $ : any;
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  allNotes : any;
  token : any;
  userID :any;
  noteId : any;
  noteDate : any;
  noteDesc : string = "";
  noteTitle : string = "";
  addForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });
  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  })
  decoded: any;
  constructor(private _NoteService : NoteService,private _AuthenticationService :AuthenticationService) {
    this.token =localStorage.getItem("userToken");
    this.decoded = jwt_decode(this.token);
    this.userID = this.decoded._id ;
    this.getUserNotes();
    this._AuthenticationService.isLOgin.next(false);
    
   }

   getUserNotes(){
     let data = {
      "token" : this.token,
      "userID" : this.userID
     }
     
      return this._NoteService.getUserNote(data).subscribe((res)=>{
        if(res.message == "success")
        {
          this.allNotes = res.Notes;
          
        }
        else{
          this.allNotes = []
        }
      })
   }

  addNote() {
    
    if (this.addForm.valid) {
      let data = {
        title: this.addForm.controls.title.value,
        desc: this.addForm.controls.desc.value,
        citizenID: this.decoded._id,
        token: this.token,
      };
      this._NoteService.addNote(data).subscribe((res) => {
        if (res.message == 'success') {
          this.getUserNotes();
          $('#addNote').modal('hide');
          
        }
      });
    }
  }

  getId(id)
  {
    this.noteId = id;
  }

  deleteNote(){
    let data =
    {
      NoteID:this.noteId,
      token: this.token
    }
    this._NoteService.deleteNote(data).subscribe((res)=>{
      if(res.message == 'deleted')
      {
        console.log("hh")
        $('#deleteNote').modal('hide');
        this.getUserNotes();
      }
      
    })

  }

  updateNotes(){
    let data =
    {
      token:this.token,
      title:this.editForm.controls.title.value,
      desc:this.editForm.controls.desc.value,
      NoteID:this.noteId
    }
    
    this._NoteService.updateNote(data).subscribe((res)=>{
      if(res.message == "updated")
      {
        console.log("hiii")
        $('#editNote').modal('hide');
        this.getUserNotes();
      }
    })
  }

  getNoteDetails(note_Id){
    
    for(let i = 0; i<this.allNotes.length;i++)
    {
      if(this.allNotes[i]._id == note_Id)
      {
        this.noteTitle = this.allNotes[i].title;
        this.noteDesc = this.allNotes[i].desc;
      }
      
    }
  }
  deleteAllNotes(){
    for(let i=0;i<this.allNotes.length;i++)
    {
      let data =
      {
        NoteID:this.allNotes[i]._id,
        token: this.token
      }
      this._NoteService.deleteNote(data).subscribe((res)=>{
        if(res.message == 'deleted')
        {
          this.getUserNotes()
        }
        
      })

    }
    
    $('#deleteAllNote').modal('hide');

  }

 
 


  ngOnInit(): void {

  }

  

}
