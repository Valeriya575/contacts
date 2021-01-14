import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app.routing'; // CLI imports AppRoutingModule
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { AddContactComponent } from './components/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
	AppComponent,
    RegisterComponent,
    LoginComponent,
    ContactListComponent,
    AddContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
	ReactiveFormsModule,
	HttpClientModule,
	NgbModule,
	AppRoutingModule,
	CommonModule,
	
	JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
	
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
