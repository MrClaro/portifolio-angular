import { Component, HostListener } from '@angular/core';
import { HeroSection } from '../../components/features/hero-section/hero-section';
import { AboutOverview } from '../../components/features/about-overview/about-overview';
import { Expertise } from '../../components/features/expertise/expertise';
import { Contact } from '../../components/features/contact/contact';
import { ProjectsList } from '../../components/features/projects-list/projects-list';

@Component({
  selector: 'app-home',
  imports: [HeroSection, AboutOverview, Expertise, ProjectsList, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  scrollY = 0;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;
  }

  scrollToContent() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }
}
