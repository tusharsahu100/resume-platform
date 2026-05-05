import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../core/models/skill.model';

@Component({
  selector: 'app-skill-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-bar.component.html'
})
export class SkillBarComponent implements OnInit {
  @Input({ required: true }) skill!: Skill;
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;

  animatedProficiency = 0;

  ngOnInit(): void {
    this.observeIntersection();
  }

  private observeIntersection(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateBar();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.progressBar.nativeElement);
  }

  private animateBar(): void {
    const duration = 1000;
    const steps = 60;
    const increment = this.skill.proficiency / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      this.animatedProficiency = Math.min(
        currentStep * increment,
        this.skill.proficiency
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);
  }
}
