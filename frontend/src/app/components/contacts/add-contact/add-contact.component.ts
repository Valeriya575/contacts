import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/jwt.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
	userForm;

  constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private jwt: JwtService,
  private router: Router,) { }

  ngOnInit(): void {
	  console.log("add-contact component");

	  this.userForm = this.formBuilder.group({
		  name:[''],
		  surname:[''],
		  number:[''],
	  });
  }
  
  onSubmit(){
	 if(this.userForm.valid){

		 this.jwt.addContact(this.userForm.value.name, this.userForm.value.surname, this.userForm.value.number);
		 
    } else {
      alert('User form is not valid!!')
    }
	
  }

}
