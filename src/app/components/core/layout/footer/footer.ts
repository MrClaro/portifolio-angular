import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: string;
  name: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerSections: FooterSection[] = [
    {
      title: 'Navegação',
      links: [
        { label: 'Início', url: '#hero' },
        { label: 'Sobre', url: '#about' },
        { label: 'Expertise', url: '#expertise' },
        { label: 'Projetos', url: '#projects' },
        { label: 'Contato', url: '#contact' },
      ],
    },
    {
      title: 'Projetos',
      links: [
        { label: 'Open Source', url: 'https://github.com/MrClaro', external: true },
        { label: 'Blog', url: '#blog' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Currículo', url: '#resume' },
        { label: 'Artigos', url: 'https://www.linkedin.com/in/adryan-claro/' },
      ],
    },
  ];

  socialLinks: SocialLink[] = [
    {
      icon: 'devicon-github-original',
      name: 'GitHub',
      url: 'https://github.com/MrClaro',
    },
    {
      icon: 'devicon-linkedin-plain',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/adryan-claro/',
    },
  ];

  quickContact = {
    email: 'adryan.contatoprofissional@gmail.com',
    phone: '+55 (14) 99872-4427',
    location: 'Ourinhos, SP',
  };

  openLink(url: string, external?: boolean): void {
    if (external) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  sendEmail(): void {
    window.location.href = `mailto:${this.quickContact.email}`;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
