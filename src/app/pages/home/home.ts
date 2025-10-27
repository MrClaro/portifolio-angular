import { Component, HostListener } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection],
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
