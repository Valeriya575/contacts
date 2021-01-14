import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact';
import { JwtService } from 'src/app/jwt.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [JwtService]
})
export class ContactListComponent implements OnInit {
	
  contacts: Contact[];

  constructor(private jwt: JwtService, private router: Router) { }

  ngOnInit() {
	  console.log("contact-list component");
	  console.log(localStorage.getItem('access_token'));
	 this.getContacts();
  }
  
  
  
  addContact(): void {
    this.router.navigate(['add-contact']);
  }
 
 getContacts(): void {
    this.jwt.getContacts().subscribe(data=>{
      this.contacts = data;
    });
	
  };
  
  deleteContact(contact: Contact){

    this.jwt.deleteContact(contact._id).subscribe(data=>{
      console.log(data);
      this.getContacts();
    });
  }
  
  updateContact(contact: Contact){
    localStorage.removeItem("id");
    localStorage.setItem("id", contact._id);
    this.router.navigate(['edit-contact']);
  }
  
  onSubmit(){

	this.jwt.logOut();
  }

}
