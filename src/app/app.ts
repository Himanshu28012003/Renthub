import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Signup } from './signup/signup';
import { Navbar } from './navbar/navbar';

@Component({
  imports: [RouterOutlet,Navbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('renthub');
}
