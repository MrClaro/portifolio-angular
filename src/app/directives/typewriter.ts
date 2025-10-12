import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
  standalone: true,
})
export class TypewriterDirective implements OnInit {
  @Input('appTypewriter') toRotate: string[] = [];
  @Input() period: number = 1000;

  private el: HTMLElement;
  private loopNum: number = 0;
  private txt: string = '';
  private isDeleting: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.tick();

    const style = `
      .wrap { border-right: 0.08em solid #fff }
    `;
    const styleElement = this.renderer.createElement('style');
    this.renderer.setAttribute(styleElement, 'type', 'text/css');
    this.renderer.appendChild(styleElement, this.renderer.createText(style));
    this.renderer.appendChild(document.body, styleElement);
  }

  private tick() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.renderer.setProperty(this.el, 'innerHTML', '<span class="wrap">' + this.txt + '</span>');

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      this.tick();
    }, delta);
  }
}
