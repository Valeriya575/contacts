import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact';
import { JwtService } from 'src/app/jwt.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
	
	userForm;
	contact: Contact;

  constructor(
  private formBuilder: FormBuilder,
  private jwt: JwtService,
  private http: HttpClient,
  private router: Router,) { }

  ngOnInit(): void {
	  
	  let id = localStorage.getItem("id");
      if(!id){
		  alert("Something wrong!");
		  this.router.navigate(['']);
		  return;
	  
      }
	  
      this.userForm = this.formBuilder.group({
		  _id: [],
		  name:[''],
		  surname:[''],
		  number:[''],
	  });
  
	 this.jwt.getContactById(id).subscribe(data=>{
      console.log(data);
      this.userForm.patchValue(data); 
    });

	}
	
	onSubmit(){
		
    if(this.userForm.valid){
      this.jwt.updateContact(this.userForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['contacts']);
      });
    }
  }
}