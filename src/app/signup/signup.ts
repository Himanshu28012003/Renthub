import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  
signup() {
  try {
    const name = this.name.trim();
    const email = this.email.trim().toLowerCase();
    const password = this.password;

    // 1. Required field validation
    if (!name || !email || !password) {
      alert('Please fill all fields.');
      return;
    }

    
  

    // 4. Password length validation
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

   
    // 6. Check existing user
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      const existingUser = JSON.parse(savedUser);

      if (
        typeof existingUser.email === 'string' &&
        existingUser.email.toLowerCase() === email
      ) {
        alert('Email already registered. Please login.');
        return;
      }
    }

    // 7. Save user
    const user = { name, email, password };

    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful. Please login.');
    this.router.navigate(['/login']);

  } catch (error) {
    console.error('Signup error:', error);
    alert('Something went wrong. Please try again.');
  }
}
}