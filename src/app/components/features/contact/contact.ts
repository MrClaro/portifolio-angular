import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
  type: 'email' | 'phone' | 'location' | 'social';
}

interface SocialLink {
  icon: string;
  name: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;

  contactInfo: ContactInfo[] = [
    {
      icon: 'email',
      title: 'Email',
      value: 'adryan.contatoprofissional@gmail.com',
      link: 'mailto:adryan.contatoprofissional@gmail.com',
      type: 'email',
    },
    {
      icon: 'phone',
      title: 'Telefone',
      value: '+55 (14) 99872-4427',
      link: 'tel:+5514998724427',
      type: 'phone',
    },
    {
      icon: 'location_on',
      title: 'Localização',
      value: 'Ourinhos, SP',
      type: 'location',
    },
  ];

  socialLinks: SocialLink[] = [
    {
      icon: 'devicon-github-original',
      name: 'GitHub',
      url: 'https://github.com/MrClaro',
      color: '#333',
    },
    {
      icon: 'devicon-linkedin-plain',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/adryan-claro/',
      color: '#0077B5',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private logger: NGXLogger,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      //TODO: Implementar lógica real de envio de email
      setTimeout(() => {
        this.logger.info('Formulário de contato enviado com sucesso.', this.contactForm.value);

        this.snackBar.open('Mensagem enviada com sucesso! Retornarei em breve.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });

        this.contactForm.reset();
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }
  }

  downloadResume(): void {
    const resumePath = '/curriculo_adryan_claro.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'curriculo_adryan_claro.pdf';
    link.click();

    this.snackBar.open('Download do currículo iniciado!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
    });
  }

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }
}
