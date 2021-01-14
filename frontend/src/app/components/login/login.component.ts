import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { JwtService } from 'src/app/jwt.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userForm;
	
	public username: string;
	public password: string;
	public error: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private jwt: JwtService, private router: Router,) { }

  ngOnInit(): void {
	  localStorage.removeItem('access_token');

	  console.log("login component")
	  this.userForm = this.formBuilder.group({
		  username:[''],
		  password:[''],
	  });
  }

  onSubmit(){
	  
	 if(this.userForm.valid){
		 this.jwt.login(this.userForm.value.username, this.userForm.value.password);
		 
    } else {
      alert('User form is not valid!!')
    }
	
  }
  
  onRegister(){
	  
	this.router.navigate(['register']);
	
  }
}
