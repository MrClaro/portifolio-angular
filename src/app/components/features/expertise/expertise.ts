import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
  skills: string[];
  highlighted?: boolean;
}

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './expertise.html',
  styleUrls: ['./expertise.scss'],
})
export class Expertise {
  expertiseItems: ExpertiseItem[] = [
    {
      icon: 'code',
      title: 'Desenvolvimento Frontend',
      description:
        'Criação de interfaces modernas e responsivas com as melhores práticas de UX/UI, garantindo performance e acessibilidade.',
      skills: ['Angular', 'Vue', 'TypeScript', 'SASS', 'Tailwind CSS'],
    },
    {
      icon: 'dns',
      title: 'Desenvolvimento Backend',
      description:
        'Desenvolvimento de APIs REST e microserviços escaláveis com arquitetura limpa e boas práticas de segurança.',
      skills: ['Java', 'Spring Boot', 'Node.js', 'NestJS', 'PostgreSQL'],
      highlighted: true,
    },
    {
      icon: 'integration_instructions',
      title: 'Integração de Sistemas',
      description:
        'Conexão eficiente entre diferentes plataformas e serviços, otimizando processos e automatizando workflows.',
      skills: ['REST APIs', 'GraphQL', 'Webhooks', 'Microserviços'],
    },
    {
      icon: 'cloud_upload',
      title: 'DevOps & Deploy',
      description:
        'Configuração de pipelines CI/CD, containerização e deploy automatizado para entrega contínua de valor.',
      skills: ['Docker', 'GitHub Actions', 'Nginx', 'Vercel', 'Linux'],
    },
    {
      icon: 'speed',
      title: 'Otimização de Performance',
      description:
        'Análise e melhoria de performance de aplicações, reduzindo tempo de carregamento e melhorando experiência do usuário.',
      skills: ['Lighthouse', 'Code Splitting', 'Lazy Loading', 'Caching'],
    },
    {
      icon: 'security',
      title: 'Segurança & Qualidade',
      description:
        'Implementação de testes automatizados e práticas de segurança para garantir código confiável e manutenível.',
      skills: ['Jest', 'Testing Library', 'OWASP', 'Code Review'],
    },
  ];

  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }

  quickContact = {
    email: 'adryan.contatoprofissional@gmail.com',
  };

  sendEmail(): void {
    window.location.href = `mailto:${this.quickContact.email}`;
  }
}
