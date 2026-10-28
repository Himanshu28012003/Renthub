import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {

  isLoggedIn = signal(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoginStatus();
      });

    window.addEventListener('authChanged', this.checkLoginStatus);
  }

  checkLoginStatus = () => {
    this.isLoggedIn.set(
      localStorage.getItem('isLoggedIn') === 'true'
    );
  };

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    window.removeEventListener('authChanged', this.checkLoginStatus);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.checkLoginStatus();
    this.router.navigate(['/login']);
  }
}