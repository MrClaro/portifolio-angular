import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FeaturedProject } from '../featured-project/featured-project';
import { IFeaturedProject } from '../../../interfaces/featured-project';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FeaturedProject],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.scss'],
})
export class ProjectsList implements OnInit {
  featuredProjects: IFeaturedProject[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  loadFeaturedProjects(): void {
    this.featuredProjects = [
      {
        title: 'Recicla Tech',
        content:
          'O ReciclaTech é uma plataforma que visa promover a sustentabilidade e a economia circular, conectando pessoas que desejam doar eletrônicos usados em bom estado com aquelas que precisam adquirir esses itens. O projeto foi construído com foco em semântica, acessibilidade e responsividade, utilizando as melhores práticas do HTML5 e SCSS.',
        resourcesTitle: 'Links Úteis',
        resources: [
          { label: 'Ver Demo', url: 'https://mrclaro.github.io/recicla-tech/' },
          { label: 'Documentação', url: 'https://github.com/MrClaro/recicla-tech' },
        ],
        technologies: ['HTML', 'SASS'],
        repoName: 'recicla-tech',
        username: 'MrClaro',
        description:
          'Plataforma de conexão para economia circular e sustentabilidade, focada na doação e aquisição de eletrônicos usados.',
        stars: 0,
        language: 'SASS',
        date: '2025-10-15',
        githubUrl: 'https://github.com/MrClaro/recicla-tech/',
        imageUrl: '/recicla-tech.png',
      },
      {
        title: 'Challenge Forum Hub - Oracle Next Education (ONE)',
        content:
          'Este projeto faz parte do programa Oracle Next Education (ONE) se tratando do ultímo challenge proposto, onde o desafio consistiu em construir uma API REST completa de fórum, com funcionalidades de tópicos, respostas, cursos, matrículas e usuários, utilizando o ecossistema Spring Boot moderno e boas práticas de arquitetura Java.',
        resourcesTitle: 'Links Úteis',
        resources: [
          { label: 'Ver Demo', url: 'https://github.com/MrClaro/challenge-forum-hub' },
          { label: 'Documentação', url: 'https://github.com/MrClaro/challenge-forum-hub' },
        ],
        technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        repoName: 'challenge-forum-hub',
        username: 'MrClaro',
        description: 'Quarto e ultimo challenge do programa ONE (Oracle Next Education)',
        stars: 0,
        language: 'Java',
        date: '2025-08-05',
        githubUrl: 'https://github.com/MrClaro/challenge-forum-hub',
        imageUrl: '/challenge.jpeg',
      },
    ];
  }

  navigateToAllProjects(): void {
    this.router.navigate(['/projetos']);
  }
}
