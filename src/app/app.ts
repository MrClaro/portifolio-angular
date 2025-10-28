import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { AboutOverview } from './components/about-overview/about-overview';
import { ProjectsList } from './components/projects-list/projects-list';
import { Expertise } from './components/expertise/expertise';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, AboutOverview, ProjectsList, Expertise, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portifolio-angular');
}
