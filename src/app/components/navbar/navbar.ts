import { Component, HostListener, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  isMenuOpen = false;
  isNavbarVisible = true;
  private lastScrollTop = 0;
  private scrollThreshold = 10;
  private ticking = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.handleScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private handleScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= 0) {
      this.isNavbarVisible = true;
      this.lastScrollTop = currentScroll;
      return;
    }

    if (Math.abs(currentScroll - this.lastScrollTop) < this.scrollThreshold) {
      return;
    }

    if (currentScroll > this.lastScrollTop && currentScroll > 80) {
      this.isNavbarVisible = false;
      if (this.isMenuOpen) {
        this.closeMenu();
      }
    } else {
      this.isNavbarVisible = true;
    }

    this.lastScrollTop = currentScroll;
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

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
