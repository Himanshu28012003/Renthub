
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private router: Router) { }

  
login() {
  // 1. Check required fields
  if (!this.email.trim() || !this.password) {
    alert('Please enter both email and password.');
    return;
  }

  

  

  // 3. Check whether a user exists
  const savedUser = localStorage.getItem('user');

  if (!savedUser) {
    alert('Please sign up first.');
    return;
  }

  try {
   
    const user = JSON.parse(savedUser);

    if (!user || typeof user !== 'object') {
      alert('Invalid saved user data. Please sign up again.');
      return;
    }

   
    if (
      typeof user.email === 'string' &&
      typeof user.password === 'string' &&
      user.email.toLowerCase() === this.email.trim().toLowerCase() &&
      user.password === this.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event('authChanged'));
      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password.');
    }
  } catch {
    alert('Unable to read saved user data. Please sign up again.');
  }
}

}