import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GitHubCard } from '../github-card/github-card';
import { FeaturedProjectI } from '../../interfaces/FeaturedProjectI';

@Component({
  selector: 'app-featured-project',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, GitHubCard],
  templateUrl: './featured-project.html',
  styleUrls: ['./featured-project.scss'],
})
export class FeaturedProject {
  @Input() project!: FeaturedProjectI;
  @Input() index: number = 0;

  constructor(private router: Router) {}

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  navigateToAllProjects(): void {
    this.router.navigate(['/projetos']);
  }

  getAnimationDelay(): string {
    return `${this.index * 0.15}s`;
  }
}
