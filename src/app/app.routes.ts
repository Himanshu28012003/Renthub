import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { Home } from './home/home';
import { ApartmentDetails } from './apartmentdetails/apartmentdetails';
import { ApartmentForm } from './apartment-forms/apartment-forms';
import { Profile } from './profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Signup },
  { path: 'add-apartment', component: ApartmentForm },
  { path: 'apartment/:id', component: ApartmentDetails },
  {path: 'profile' , component:Profile},
  { path: '**', redirectTo: '' }
];