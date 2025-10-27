import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { AboutOverview } from './components/about-overview/about-overview';
import { ProjectsList } from './components/projects-list/projects-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, AboutOverview, ProjectsList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portifolio-angular');
}
