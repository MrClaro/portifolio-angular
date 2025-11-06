import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GitHubCard } from '../github-card/github-card';
import { IFeaturedProject } from '../../../interfaces/featured-project';

@Component({
  selector: 'app-featured-project',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, GitHubCard],
  templateUrl: './featured-project.html',
  styleUrls: ['./featured-project.scss'],
})
export class FeaturedProject {
  @Input() project!: IFeaturedProject;
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

  getTechnologyIcon(techName: string): string {
    const normalizedTech = techName.toLowerCase().trim().replace(/\s+/g, '');

    const icons: { [key: string]: string } = {
      // Linguagens
      javascript: 'devicon-javascript-plain',
      typescript: 'devicon-typescript-plain',
      python: 'devicon-python-plain',
      java: 'devicon-java-plain',
      lua: 'devicon-lua-plain',
      bash: 'devicon-bash-plain',

      // Frameworks Frontend
      angular: 'devicon-angular-plain',
      react: 'devicon-react-original',
      vue: 'devicon-vuejs-plain',
      vuejs: 'devicon-vuejs-plain',
      nextjs: 'devicon-nextjs-plain',

      // Frameworks Backend
      nodejs: 'devicon-nodejs-plain',
      node: 'devicon-nodejs-plain',
      express: 'devicon-express-original',
      nestjs: 'devicon-nestjs-original',
      springboot: 'devicon-spring-original',
      quarkus: 'devicon-quarkus-plain',
      hibernate: 'devicon-hibernate-plain',

      // CSS/Styling
      html: 'devicon-html5-plain',
      html5: 'devicon-html5-plain',
      css: 'devicon-css3-plain',
      css3: 'devicon-css3-plain',
      sass: 'devicon-sass-original',
      tailwind: 'devicon-tailwindcss-original',
      tailwindcss: 'devicon-tailwindcss-original',
      bootstrap: 'devicon-bootstrap-plain',
      material: 'devicon-angularmaterial-plain',

      // Databases
      postgresql: 'devicon-postgresql-plain',
      postgres: 'devicon-postgresql-plain',
      mysql: 'devicon-mysql-original',
      mongodb: 'devicon-mongodb-plain',
      redis: 'devicon-redis-plain',
      mariadb: 'devicon-mariadb-original',
      prisma: 'devicon-prisma-original',

      // DevOps/Tools
      docker: 'devicon-docker-plain',
      git: 'devicon-git-plain',
      github: 'devicon-github-original',
      githubactions: 'devicon-githubactions-plain',
      nginx: 'devicon-nginx-original',
      vercel: 'devicon-vercel-original',
      maven: 'devicon-maven-plain',
      npm: 'devicon-npm-original-wordmark',

      // IDEs
      vscode: 'devicon-vscode-plain',
      intellij: 'devicon-intellij-plain',
      eclipse: 'devicon-eclipse-plain',
      neovim: 'devicon-neovim-plain',

      // Testing
      jest: 'devicon-jest-plain',

      // Linux
      linux: 'devicon-linux-plain',
      debian: 'devicon-debian-plain',
      archlinux: 'devicon-archlinux-plain',
      gentoo: 'devicon-gentoo-plain',
    };

    return icons[normalizedTech] || 'devicon-devicon-plain';
  }
}
