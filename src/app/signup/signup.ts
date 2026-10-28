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
    if (!this.name || !this.email || !this.password) {
      alert('Please fill all fields');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful. Please login.');

    this.router.navigate(['/login']);
  }
}