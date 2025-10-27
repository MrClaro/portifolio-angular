import { Component, HostListener } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TypewriterDirective } from '../../directives/typewriter';
import { SkillsMarquee } from '../skills-marquee/skills-marquee';

@Component({
  selector: 'app-hero-section',
  imports: [SkillsMarquee, NgxTypedJsModule, TypewriterDirective],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  scrollIndicatorOpacity = 1;
  private ticking = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.handleScrollIndicator();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private handleScrollIndicator(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const fadeStart = 0;
    const fadeEnd = 300;

    if (currentScroll <= fadeStart) {
      this.scrollIndicatorOpacity = 1;
    } else if (currentScroll >= fadeEnd) {
      this.scrollIndicatorOpacity = 0;
    } else {
      this.scrollIndicatorOpacity = 1 - (currentScroll - fadeStart) / (fadeEnd - fadeStart);
    }
  }

  scrollToNextSection(): void {
    const heroHeight = window.innerHeight;

    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth',
    });
  }
}
