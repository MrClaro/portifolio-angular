import { Component } from '@angular/core';
import { SkillsMarquee } from '../skills-marquee/skills-marquee';

@Component({
  selector: 'app-hero-section',
  imports: [SkillsMarquee],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  scrollToNextSection() {
    throw new Error('Method not implemented.');
  }
}
