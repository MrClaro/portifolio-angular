import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatSnackBarModule, CommonModule],
  templateUrl: './github-card.html',
  styleUrls: ['./github-card.scss'],
})
export class GitHubCard implements OnInit {
  @Input() repoName: string = 'Nome do Repositório';
  @Input() username: string = 'MrClaro';
  @Input() language: string = 'TypeScript';
  @Input() stars: number = 0;
  @Input() description: string = 'Uma breve descrição do projeto.';
  @Input() date: string = 'Out 24';
  @Input() imageUrl: string = '';
  @Input() githubUrl: string = '';

  public deviconClass: string = '';
  public isStarred: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setDeviconClass();
  }

  private setDeviconClass(): void {
    const languageMap: { [key: string]: string } = {
      javascript: 'devicon-javascript-plain colored',
      typescript: 'devicon-typescript-plain colored',
      python: 'devicon-python-plain colored',
      java: 'devicon-java-plain colored',
      html: 'devicon-html5-plain colored',
      css: 'devicon-css3-plain colored',
      react: 'devicon-react-original colored',
      angular: 'devicon-angularjs-plain colored',
      vue: 'devicon-vuejs-plain colored',
      node: 'devicon-nodejs-plain colored',
      php: 'devicon-php-plain colored',
      'c++': 'devicon-cplusplus-plain colored',
      'c#': 'devicon-csharp-plain colored',
      ruby: 'devicon-ruby-plain colored',
      go: 'devicon-go-original-wordmark colored',
      rust: 'devicon-rust-plain colored',
      kotlin: 'devicon-kotlin-plain colored',
      swift: 'devicon-swift-plain colored',
      markdown: 'devicon-markdown-original colored',
    };

    const lang = this.language.toLowerCase();
    this.deviconClass = languageMap[lang] || 'devicon-github-original colored';
  }

  copyToClipboard(): void {
    const url = this.githubUrl || `https://github.com/${this.username}/${this.repoName}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.showSnackBar('Link copiado! 📋');
        })
        .catch(() => {
          this.fallbackCopy(url);
        });
    } else {
      this.fallbackCopy(url);
    }
  }

  private fallbackCopy(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      this.showSnackBar('Link copiado! 📋');
    } catch (err) {
      this.showSnackBar('Erro ao copiar link');
    }

    document.body.removeChild(textArea);
  }

  toggleStar(): void {
    this.isStarred = !this.isStarred;
    const message = this.isStarred ? 'Adicionado aos favoritos! ⭐' : 'Removido dos favoritos';
    this.showSnackBar(message);
  }

  share(): void {
    const url = this.githubUrl || `https://github.com/${this.username}/${this.repoName}`;

    if (navigator.share) {
      navigator
        .share({
          title: this.repoName,
          text: this.description,
          url: url,
        })
        .then(() => {
          this.showSnackBar('Compartilhado com sucesso! 🚀');
        })
        .catch(() => {
          this.copyToClipboard();
        });
    } else {
      this.copyToClipboard();
    }
  }

  openGithub(): void {
    const url = this.githubUrl || `https://github.com/${this.username}/${this.repoName}`;
    window.open(url, '_blank');
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
