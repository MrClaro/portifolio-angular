import { Component, HostListener, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [MatToolbar, MatIcon],
})
export class Navbar implements OnInit {
  isNavbarVisible = true;
  isMenuOpen = false;
  isScrolled = false;
  currentLang = 'pt';
  private lastScrollTop = 0;
  private scrollThreshold = 50;

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('language') || 'pt';
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    this.isScrolled = currentScroll > 20;

    if (currentScroll > this.lastScrollTop && currentScroll > this.scrollThreshold) {
      this.isNavbarVisible = false;
      this.closeMenu();
    } else {
      this.isNavbarVisible = true;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  changeLanguage(lang: 'pt' | 'en'): void {
    this.currentLang = lang;
    localStorage.setItem('language', lang);

    //TODO: Implementar lógica de tradução
    // Exemplo: this.translateService.use(lang);

    console.log(`Idioma alterado para: ${lang}`);
  }
}
