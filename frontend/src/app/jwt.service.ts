import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { Router } from '@angular/router';
import { Contact } from 'src/app/contacts/contact';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient,  private router: Router) { }
  
	login(username: string, password: string) {

		 this.http.post<{token:  string}>('http://localhost:3000/login', {username, password}).subscribe(
			(response)=>{
				console.log('response', response.token);
				localStorage.setItem('access_token', response.token);
				console.log(localStorage.getItem('access_token'));
				
				this.router.navigate(['contacts']);

			 })
		
	}

	logOut() {
		
	  localStorage.removeItem('access_token');
	  this.router.navigate(['login']);

	}
	
	  public get loggedIn(): boolean{
		  
	  return localStorage.getItem('access_token') !==  null;
	}
	
	register(username: string, name: string, surname: string, password:string) {

		this.http.post('http://localhost:3000/register', {username, name, surname,  password}).subscribe(
		(response)=>{
		 console.log('response', response);
		 this.login(username, password);

		 })
		 
		 
	}
	
	addContact(name: string, surname: string, number:string){
		
		var token = localStorage.getItem('access_token');
		this.http.post('http://localhost:3000/contacts', {name, surname, number, token}).subscribe(
		(response)=>{
		 console.log('response', response);
		 this.router.navigate(['contacts']);

		 })
	}
	
	getContactById(id: string){
		
		return this.http.get<Contact>('http://localhost:3000/' + 'contacts' + '/' + id);
	}
	
	getContacts(){
		
		console.log(localStorage.getItem('access_token'));
		let params = new HttpParams().set('token', localStorage.getItem('access_token'));

		return this.http.get<Contact[]>('http://localhost:3000/' + 'contacts', { params: params });
    }
	
	deleteContact(id: string){
		
		return this.http.delete('http://localhost:3000/' + 'contacts' + '/' + id);

	}
	
	updateContact(contact: Contact){
		
		return this.http.put('http://localhost:3000/' + 'contacts' + '/' + contact._id, contact);
  }


}
