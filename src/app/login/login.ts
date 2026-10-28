
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

  constructor(private router: Router) {}

  login() {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      alert('Please sign up first');
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      user.email === this.email &&
      user.password === this.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');

      // Notify the Navbar immediately
      window.dispatchEvent(new Event('authChanged'));

      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password');
    }
  }
}
