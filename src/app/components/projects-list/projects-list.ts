import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FeaturedProject } from '../featured-project/featured-project';
import { FeaturedProjectI } from '../../interfaces/FeaturedProjectI';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FeaturedProject],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.scss'],
})
export class ProjectsList implements OnInit {
  featuredProjects: FeaturedProjectI[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  loadFeaturedProjects(): void {
    this.featuredProjects = [
      {
        title: 'Sistema de E-commerce Completo',
        content: 'Plataforma de e-commerce desenvolvida com Angular e Spring Boot...',
        resourcesTitle: 'Links Úteis',
        resources: [
          { label: 'Ver Demo', url: 'https://demo-ecommerce.com' },
          { label: 'Documentação', url: 'https://docs-ecommerce.com' },
        ],
        technologies: ['Angular', 'Spring Boot', 'PostgreSQL'],
        repoName: 'ecommerce-platform',
        username: 'seu-usuario',
        description: 'Full-stack e-commerce platform...',
        stars: 245,
        language: 'Java',
        date: '2024-10-01',
        githubUrl: 'https://github.com/seu-usuario/ecommerce-platform',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      },
      {
        title: 'Sistema de E-commerce Completo',
        content: 'Plataforma de e-commerce desenvolvida com Angular e Spring Boot...',
        resourcesTitle: 'Links Úteis',
        resources: [
          { label: 'Ver Demo', url: 'https://demo-ecommerce.com' },
          { label: 'Documentação', url: 'https://docs-ecommerce.com' },
        ],
        technologies: ['Angular', 'Spring Boot', 'PostgreSQL'],
        repoName: 'ecommerce-platform',
        username: 'seu-usuario',
        description: 'Full-stack e-commerce platform...',
        stars: 245,
        language: 'TypeScript',
        date: '2024-10-01',
        githubUrl: 'https://github.com/seu-usuario/ecommerce-platform',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      },
    ];
  }

  navigateToAllProjects(): void {
    this.router.navigate(['/projetos']);
  }
}
