import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  scrollToSection(sectionId: string): void {
    const element = this.document.getElementById(sectionId);
    if (element) {
      this.scrollToElement(element);
    } else {
      console.warn(`Section with id '${sectionId}' not found`);
    }
  }

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
