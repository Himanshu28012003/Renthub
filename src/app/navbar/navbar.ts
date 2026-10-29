import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  RouterLink,
  NavigationEnd
} from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {

  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen for login changes
    window.addEventListener('authChanged', this.updateLoginStatus);

    // Recheck login status after navigation
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateLoginStatus();
      });

    this.updateLoginStatus();
  }

  updateLoginStatus = () => {
    this.isLoggedIn =
      localStorage.getItem('isLoggedIn') === 'true';
  };

  ngOnDestroy() {
    window.removeEventListener('authChanged', this.updateLoginStatus);
    this.routerSubscription?.unsubscribe();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.updateLoginStatus();
    this.router.navigate(['/login']);
  }
}