import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  current?: boolean;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

interface Course {
  name: string;
  platform: string;
  duration: string;
  completed: boolean;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About {
  profile = {
    name: 'Adryan Claro',
    title: 'Desenvolvedor Full Stack',
    location: 'Ourinhos, São Paulo, Brasil',
    email: 'adryan.contatoprofissional@gmail.com',
    phone: '+55 (14) 99872-4427',
    bio: 'Desenvolvedor apaixonado por tecnologia com mais de 1 ano de experiência focado em desenvolvimento web. Sou especialista em criar soluções escaláveis e eficientes usando tecnologias modernas. Minha trajetória é marcada pela busca contínua por conhecimento e aprendizado, o que me levou a participar de programas de alto nível. Entre as minhas credenciais, destaco: Harvard Business School ALP ’25 Alumni, e aluno dos programas avançados como o ONE da Oracle, a formação Desenvolvedor Júnior da Amazon e a formação de Gerenciamento de Projetos do Google. Possuo também capacitação em Java pelo Instituto Caldeira e pelo programa Desenvolve (Grupo Boticário).',
    skills: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Express.js',
      'NestJS',
      'React',
      'Vue.js',
      'Java',
      'Spring Boot',
      'Quarkus',
      'Docker',
      'Kubernetes',
      'OCI',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Git',
    ],
  };

  experiences: Experience[] = [
    {
      title: 'Estágiario TI',
      company: 'Mervil Transportes',
      period: 'Fev 2025 - Mai 2025',
      description:
        'Desenvolvimento de funcionalidades para o sistema interno da empresa utilizando tecnologias modernas. Participação em reuniões de planejamento e revisão de código.',
      technologies: ['React', 'NextJS', 'TypeScript', 'Docker', 'NodeJS', 'NestJS'],
      // current: false,
    },
    {
      title: 'Desenvolvedor Back End',
      company: 'Assert Tech',
      period: 'Ago 2024 - Nov 2025',
      description:
        'Desenvolvimento de APIs RESTful e gerenciamento de banco de dados. Colaboração em equipes ágeis para entrega contínua de software.',
      technologies: ['Node', 'Express.JS', 'MySQL', 'Redis', 'Prisma', 'Bull'],
    },
    {
      title: 'Analista de Dados',
      company: 'Assert Tech',
      period: 'Mai 2024 - Jul 2024',
      description:
        'Análise e visualização de dados para otimizar processos de negócios. Disparo de campanhas VOIP e SMS utilizando Salesforce CRM.',
      technologies: ['Excel', 'VBA', 'Salesforce', 'Power BI'],
    },
  ];

  education: Education[] = [
    {
      degree: 'Bacharelado em Engenharia de Software',
      institution: 'Centro Universitário das Faculdades Integradas de Ourinhos',
      period: '2024 - 2027',
      description: 'Foco em desenvolvimento de software, algoritmos e estruturas de dados.',
    },
  ];

  certifications: Certification[] = [
    {
      name: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
      issuer: 'Oracle',
      date: 'Nov 2025',
      credentialId: '23A582F666615D8DE8EFED3E7EBC3CF904B055D529F074714D25ADA4534FBE44',
      link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=23A582F666615D8DE8EFED3E7EBC3CF904B055D529F074714D25ADA4534FBE44',
    },
  ];

  courses: Course[] = [
    {
      name: 'Formação ONE - Oracle Next Education - Desenvolvedor Back-End Java',
      platform: 'Oracle',
      duration: '700 Horas',
      completed: true,
    },
    {
      name: 'Desenvolvimento Full Stack Java',
      platform: 'Orbit Systems',
      duration: '180 Horas',
      completed: true,
    },
    {
      name: 'Formação PROA',
      platform: 'PROA',
      duration: '100 Horas',
      completed: true,
    },
    {
      name: 'Gestão Empresarial',
      platform: 'Speed Treinamentos',
      duration: '104 Horas',
      completed: true,
    },
    {
      name: 'Aspire Leaders Program - Harvard Business School ALP ’25',
      platform: 'Harvard Business School',
      duration: '50 Horas',
      completed: true,
    },
    {
      name: 'Java Básico',
      platform: 'Instituto Caldeira',
      duration: '40 Horas',
      completed: true,
    },
    {
      name: 'Fundamentos de IA e Dados - Desenvolve',
      platform: 'Grupo Boticário',
      duration: '30 Horas',
      completed: true,
    },
    {
      name: 'SQL e Banco de Dados Completo',
      platform: 'Softblue',
      duration: '20 Horas',
      completed: true,
    },
    {
      name: 'Formação Desenvolvedor Júnior',
      platform: 'Amazon',
      duration: '200 Horas',
      completed: false,
    },
    {
      name: 'Formação Gerenciamento de Projetos',
      platform: 'Google',
      duration: '140 Horas',
      completed: false,
    },
  ];

  selectedTab: 'experience' | 'education' | 'courses' = 'experience';

  selectTab(tab: 'experience' | 'education' | 'courses'): void {
    this.selectedTab = tab;
  }

  getInitials(): string {
    return this.profile.name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  getCompletedCoursesCount(): number {
    return this.courses.filter((c) => c.completed).length;
  }

  getInProgressCoursesCount(): number {
    return this.courses.filter((c) => !c.completed).length;
  }
}
