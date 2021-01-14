import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/jwt.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	userForm;

  constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private jwt: JwtService,
  private router: Router,
	) { }

  ngOnInit(): void {
	  console.log("register component");

	  this.userForm = this.formBuilder.group({
		  username:[''],
		  name:[''],
		  surname:[''],
		  password:['']
	  });
  }
  
  onSubmit(){
	 if(this.userForm.valid){

		 this.jwt.register(this.userForm.value.username, this.userForm.value.name, this.userForm.value.surname, this.userForm.value.password);

    } else {
      alert('User form is not valid!!')
    }
	
  }
}
