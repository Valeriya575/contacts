import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { AddContactComponent } from './components/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'contacts', component: ContactListComponent},
	{path: 'add-contact', component: AddContactComponent},
	{path: 'edit-contact', component: EditContactComponent},
	{ path: '**', component: LoginComponent},

    ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
