# Resume Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a GitHub-style, single-page resume website with PDF export, cover letter templates, and responsive design

**Architecture:** Hybrid incremental approach - main resume page with inline sections, reusable shared components (skill-bar, project-card, timeline), separate cover letter routes. Core scroll service implemented first, GitHub API and PDF services stubbed/deferred initially.

**Tech Stack:** Angular 20, TypeScript, Tailwind CSS, jsPDF, GitHub Pages

---

## Scope Summary

**What we have:**
- ✅ All models defined (Experience, Skill, Project, Education, CoverLetter, PersonalInfo)
- ✅ All data files populated with real resume data
- ✅ Services fully implemented (GithubService, PdfService, ScrollService)
- ✅ Tailwind CSS configured with GitHub-style colors
- ✅ Angular 20 project scaffolded

**What we need:**
- ❌ Main resume page component with all sections
- ❌ Shared reusable components (skill-bar, project-card, timeline, header, footer)
- ❌ Cover letter page component
- ❌ Routes configuration
- ❌ Responsive navigation header with smooth scroll
- ❌ Integration of services with UI
- ❌ Responsive design testing
- ❌ GitHub Pages deployment configuration

---

## File Structure

```
resume-platform/src/app/
├── app.component.ts              [MODIFY] - Update to use router outlet
├── app.routes.ts                 [MODIFY] - Add routes
├── app.config.ts                 [EXISTS] - Already configured
├── shared/
│   └── components/
│       ├── header/
│       │   ├── header.component.ts        [CREATE]
│       │   └── header.component.html      [CREATE]
│       ├── footer/
│       │   ├── footer.component.ts        [CREATE]
│       │   └── footer.component.html      [CREATE]
│       ├── skill-bar/
│       │   ├── skill-bar.component.ts     [CREATE]
│       │   └── skill-bar.component.html   [CREATE]
│       ├── project-card/
│       │   ├── project-card.component.ts  [CREATE]
│       │   └── project-card.component.html[CREATE]
│       └── timeline-item/
│           ├── timeline-item.component.ts [CREATE]
│           └── timeline-item.component.html[CREATE]
├── features/
│   ├── resume/
│   │   ├── resume.component.ts            [CREATE]
│   │   └── resume.component.html          [CREATE]
│   └── cover-letter/
│       ├── cover-letter.component.ts      [CREATE]
│       └── cover-letter.component.html    [CREATE]
└── core/
    ├── models/      [EXISTS]
    ├── services/    [EXISTS]
    └── data/        [EXISTS]
```

---

## Task 1: Create Shared Components - Header

**Files:**
- Create: `resume-platform/src/app/shared/components/header/header.component.ts`
- Create: `resume-platform/src/app/shared/components/header/header.component.html`

- [ ] **Step 1: Create header component TypeScript file**

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private scrollService = inject(ScrollService);
  mobileMenuOpen = false;

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'summary', label: 'Summary' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' }
  ];

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
```

- [ ] **Step 2: Create header component HTML template**

```html
<header class="sticky top-0 z-50 bg-white border-b border-gh-border shadow-sm">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Name -->
      <div class="flex-shrink-0">
        <button
          (click)="scrollToSection('home')"
          class="text-xl font-bold text-gh-dark hover:text-gh-blue transition-colors"
        >
          Tushar Sahu
        </button>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex md:space-x-8">
        <button
          *ngFor="let link of navLinks"
          (click)="scrollToSection(link.id)"
          class="text-gh-light hover:text-gh-blue px-3 py-2 text-sm font-medium transition-colors"
        >
          {{ link.label }}
        </button>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          (click)="toggleMobileMenu()"
          class="text-gh-dark hover:text-gh-blue p-2"
          aria-label="Toggle menu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              *ngIf="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              *ngIf="mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div
      *ngIf="mobileMenuOpen"
      class="md:hidden border-t border-gh-border"
    >
      <div class="py-2 space-y-1">
        <button
          *ngFor="let link of navLinks"
          (click)="scrollToSection(link.id)"
          class="block w-full text-left px-4 py-2 text-base font-medium text-gh-light hover:text-gh-blue hover:bg-gh-bg transition-colors"
        >
          {{ link.label }}
        </button>
      </div>
    </div>
  </nav>
</header>
```

- [ ] **Step 3: Verify header component files created**

Run: `ls -la resume-platform/src/app/shared/components/header/`

Expected: Both `.ts` and `.html` files exist

- [ ] **Step 4: Commit header component**

```bash
git add resume-platform/src/app/shared/components/header/
git commit -m "feat: add header component with sticky navigation"
```

---

## Task 2: Create Shared Components - Footer

**Files:**
- Create: `resume-platform/src/app/shared/components/footer/footer.component.ts`
- Create: `resume-platform/src/app/shared/components/footer/footer.component.html`

- [ ] **Step 1: Create footer component TypeScript file**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PERSONAL_INFO } from '../../../core/data/personal-info.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  personalInfo = PERSONAL_INFO;
  currentYear = new Date().getFullYear();
}
```

- [ ] **Step 2: Create footer component HTML template**

```html
<footer class="bg-white border-t border-gh-border mt-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col items-center space-y-4">
      <!-- Social Links -->
      <div class="flex space-x-6">
        <a
          [href]="personalInfo.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gh-light hover:text-gh-blue transition-colors"
          aria-label="LinkedIn"
        >
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          [href]="personalInfo.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gh-light hover:text-gh-blue transition-colors"
          aria-label="GitHub"
        >
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          [href]="'mailto:' + personalInfo.email"
          class="text-gh-light hover:text-gh-blue transition-colors"
          aria-label="Email"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </a>
      </div>

      <!-- Tech Badge -->
      <div class="text-sm text-gh-light">
        Built with <span class="font-semibold text-gh-blue">Angular</span> +
        <span class="font-semibold text-gh-blue">TypeScript</span>
      </div>

      <!-- Copyright -->
      <div class="text-sm text-gh-light">
        © {{ currentYear }} {{ personalInfo.name }}. All rights reserved.
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Verify footer component files created**

Run: `ls -la resume-platform/src/app/shared/components/footer/`

Expected: Both `.ts` and `.html` files exist

- [ ] **Step 4: Commit footer component**

```bash
git add resume-platform/src/app/shared/components/footer/
git commit -m "feat: add footer component with social links"
```

---

## Task 3: Create Shared Components - Skill Bar

**Files:**
- Create: `resume-platform/src/app/shared/components/skill-bar/skill-bar.component.ts`
- Create: `resume-platform/src/app/shared/components/skill-bar/skill-bar.component.html`

- [ ] **Step 1: Create skill-bar component TypeScript file**

```typescript
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
```

- [ ] **Step 2: Create skill-bar component HTML template**

```html
<div class="mb-4">
  <div class="flex justify-between items-center mb-2">
    <span class="text-sm font-medium text-gh-dark">{{ skill.name }}</span>
    <span class="text-sm text-gh-light">{{ skill.proficiency }}%</span>
  </div>
  <div
    #progressBar
    class="w-full h-6 bg-gray-200 rounded-lg overflow-hidden"
  >
    <div
      class="h-full bg-gradient-to-r from-gh-blue to-blue-400 transition-all duration-1000 ease-out flex items-center justify-end px-2"
      [style.width.%]="animatedProficiency"
    >
      <span
        *ngIf="animatedProficiency > 15"
        class="text-xs font-semibold text-white"
      >
        {{ skill.proficiency }}%
      </span>
    </div>
  </div>
  <div
    *ngIf="skill.yearsOfExperience"
    class="text-xs text-gh-light mt-1"
  >
    {{ skill.yearsOfExperience }} years experience
  </div>
</div>
```

- [ ] **Step 3: Verify skill-bar component files created**

Run: `ls -la resume-platform/src/app/shared/components/skill-bar/`

Expected: Both `.ts` and `.html` files exist

- [ ] **Step 4: Commit skill-bar component**

```bash
git add resume-platform/src/app/shared/components/skill-bar/
git commit -m "feat: add skill-bar component with animation"
```

---

## Task 4: Create Shared Components - Project Card

**Files:**
- Create: `resume-platform/src/app/shared/components/project-card/project-card.component.ts`
- Create: `resume-platform/src/app/shared/components/project-card/project-card.component.html`

- [ ] **Step 1: Create project-card component TypeScript file**

```typescript
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { GithubService } from '../../../core/services/github.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent implements OnInit {
  @Input({ required: true }) project!: Project;
  private githubService = inject(GithubService);

  expanded = false;

  ngOnInit(): void {
    if (this.project.githubRepo) {
      const [owner, repo] = this.project.githubRepo.split('/');
      this.githubService.getRepoStats(owner, repo).subscribe(stats => {
        if (stats) {
          this.project.stars = stats.stargazers_count;
          this.project.forks = stats.forks_count;
          this.project.language = stats.language;
          this.project.lastUpdated = this.formatDate(stats.updated_at);
        }
      });
    }
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
}
```

- [ ] **Step 2: Create project-card component HTML template**

```html
<div
  class="bg-white border border-gh-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
  (click)="toggleExpanded()"
>
  <!-- Project Header -->
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-xl font-bold text-gh-dark">{{ project.name }}</h3>
    <svg
      class="w-5 h-5 text-gh-light transition-transform"
      [class.rotate-180]="expanded"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </div>

  <!-- Short Description -->
  <p class="text-gh-light mb-4">
    {{ expanded ? (project.longDescription || project.description) : project.description }}
  </p>

  <!-- Tech Stack Badges -->
  <div class="flex flex-wrap gap-2 mb-4">
    <span
      *ngFor="let tech of project.techStack"
      class="px-3 py-1 text-xs font-medium text-gh-blue bg-blue-50 rounded-full"
    >
      {{ tech }}
    </span>
  </div>

  <!-- GitHub Stats (if available) -->
  <div
    *ngIf="project.stars !== undefined || project.language"
    class="flex items-center space-x-4 text-sm text-gh-light mb-3"
  >
    <div *ngIf="project.language" class="flex items-center space-x-1">
      <span class="w-3 h-3 rounded-full bg-gh-blue"></span>
      <span>{{ project.language }}</span>
    </div>
    <div *ngIf="project.stars !== undefined" class="flex items-center space-x-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      <span>{{ project.stars }}</span>
    </div>
    <div *ngIf="project.forks !== undefined" class="flex items-center space-x-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
      </svg>
      <span>{{ project.forks }}</span>
    </div>
  </div>

  <!-- Links -->
  <div class="flex space-x-4">
    <a
      *ngIf="project.githubRepo"
      [href]="'https://github.com/' + project.githubRepo"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm text-gh-blue hover:underline"
      (click)="$event.stopPropagation()"
    >
      View Code →
    </a>
    <a
      *ngIf="project.liveUrl"
      [href]="project.liveUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm text-gh-blue hover:underline"
      (click)="$event.stopPropagation()"
    >
      Live Demo →
    </a>
  </div>

  <!-- Last Updated -->
  <div *ngIf="project.lastUpdated" class="text-xs text-gh-light mt-3">
    Updated {{ project.lastUpdated }}
  </div>
</div>
```

- [ ] **Step 3: Verify project-card component files created**

Run: `ls -la resume-platform/src/app/shared/components/project-card/`

Expected: Both `.ts` and `.html` files exist

- [ ] **Step 4: Commit project-card component**

```bash
git add resume-platform/src/app/shared/components/project-card/
git commit -m "feat: add project-card component with GitHub stats"
```

---

## Task 5: Create Shared Components - Timeline Item

**Files:**
- Create: `resume-platform/src/app/shared/components/timeline-item/timeline-item.component.ts`
- Create: `resume-platform/src/app/shared/components/timeline-item/timeline-item.component.html`

- [ ] **Step 1: Create timeline-item component TypeScript file**

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../core/models/experience.model';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-item.component.html'
})
export class TimelineItemComponent {
  @Input({ required: true }) experience!: Experience;
  @Input() isLast = false;

  expanded = false;

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
}
```

- [ ] **Step 2: Create timeline-item component HTML template**

```html
<div class="relative pb-8">
  <!-- Vertical Line -->
  <div
    *ngIf="!isLast"
    class="absolute left-4 top-10 bottom-0 w-0.5 bg-gh-border"
  ></div>

  <!-- Timeline Node -->
  <div class="relative flex items-start space-x-4">
    <div class="flex-shrink-0 mt-1">
      <div class="w-8 h-8 bg-gh-blue rounded-full border-4 border-white shadow"></div>
    </div>

    <!-- Content Card -->
    <div class="flex-1 bg-white border border-gh-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <!-- Company & Duration -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 class="text-xl font-bold text-gh-dark">{{ experience.company }}</h3>
        <span class="text-sm text-gh-light mt-1 sm:mt-0">{{ experience.duration }}</span>
      </div>

      <!-- Role & Location -->
      <div class="mb-3">
        <p class="text-lg font-semibold text-gh-blue">{{ experience.role }}</p>
        <p class="text-sm text-gh-light">{{ experience.location }}</p>
      </div>

      <!-- Description -->
      <div class="space-y-2 mb-4">
        <ul class="list-disc list-inside space-y-1">
          <li
            *ngFor="let desc of (expanded ? experience.description : experience.description.slice(0, 2))"
            class="text-gh-dark"
          >
            {{ desc }}
          </li>
        </ul>
      </div>

      <!-- Show More/Less Button -->
      <button
        *ngIf="experience.description.length > 2"
        (click)="toggleExpanded()"
        class="text-sm text-gh-blue hover:underline mb-3"
      >
        {{ expanded ? 'Show less' : 'Show more' }}
      </button>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          *ngFor="let tech of experience.technologies"
          class="px-3 py-1 text-xs font-medium text-gh-blue bg-blue-50 rounded-full"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Achievements -->
      <div *ngIf="experience.achievements && experience.achievements.length > 0" class="mt-4 pt-4 border-t border-gh-border">
        <p class="text-sm font-semibold text-gh-dark mb-2">Key Achievements:</p>
        <ul class="list-disc list-inside space-y-1">
          <li
            *ngFor="let achievement of experience.achievements"
            class="text-sm text-gh-light"
          >
            {{ achievement }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verify timeline-item component files created**

Run: `ls -la resume-platform/src/app/shared/components/timeline-item/`

Expected: Both `.ts` and `.html` files exist

- [ ] **Step 4: Commit timeline-item component**

```bash
git add resume-platform/src/app/shared/components/timeline-item/
git commit -m "feat: add timeline-item component for experience"
```

---

## Task 6: Create Resume Page Component

**Files:**
- Create: `resume-platform/src/app/features/resume/resume.component.ts`
- Create: `resume-platform/src/app/features/resume/resume.component.html`

- [ ] **Step 1: Create resume component TypeScript file**

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SkillBarComponent } from '../../shared/components/skill-bar/skill-bar.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';
import { PERSONAL_INFO } from '../../core/data/personal-info.data';
import { EXPERIENCES } from '../../core/data/experience.data';
import { SKILLS } from '../../core/data/skills.data';
import { PROJECTS } from '../../core/data/projects.data';
import { EDUCATION } from '../../core/data/education.data';
import { PdfService } from '../../core/services/pdf.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SkillBarComponent,
    ProjectCardComponent,
    TimelineItemComponent
  ],
  templateUrl: './resume.component.html'
})
export class ResumeComponent {
  private pdfService = inject(PdfService);
  private scrollService = inject(ScrollService);

  personalInfo = PERSONAL_INFO;
  experiences = EXPERIENCES;
  skills = SKILLS;
  projects = PROJECTS.filter(p => p.featured);
  education = EDUCATION;

  showBackToTop = false;

  skillCategories = [
    { name: 'Frontend', skills: this.skills.filter(s => s.category === 'Frontend') },
    { name: 'Backend', skills: this.skills.filter(s => s.category === 'Backend') },
    { name: 'Tools', skills: this.skills.filter(s => s.category === 'Tools') },
    { name: 'Other', skills: this.skills.filter(s => s.category === 'Other') }
  ];

  ngOnInit(): void {
    this.setupScrollListener();
  }

  downloadResume(): void {
    this.pdfService.generateResumePdf({
      personalInfo: this.personalInfo,
      experiences: this.experiences,
      skills: this.skills,
      education: this.education,
      projects: this.projects
    });
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }

  private setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.showBackToTop = window.scrollY > 500;
    });
  }
}
```

- [ ] **Step 2: Create resume component HTML template (Part 1 - Hero & Summary)**

```html
<app-header></app-header>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Hero Section -->
  <section id="home" class="py-16 text-center bg-gradient-to-b from-white to-gh-bg rounded-lg mb-12">
    <div class="mb-6">
      <div class="w-40 h-40 mx-auto rounded-full bg-gray-300 border-4 border-gh-blue shadow-lg"></div>
    </div>
    <h1 class="text-5xl font-bold text-gh-dark mb-2">{{ personalInfo.name }}</h1>
    <p class="text-xl text-gh-light mb-4">
      {{ personalInfo.role }} @ {{ personalInfo.company }}
    </p>
    <div class="flex flex-wrap justify-center gap-4 mb-6 text-gh-light">
      <a [href]="'mailto:' + personalInfo.email" class="hover:text-gh-blue transition-colors">
        {{ personalInfo.email }}
      </a>
      <span>•</span>
      <span>{{ personalInfo.phone }}</span>
      <span>•</span>
      <a [href]="personalInfo.linkedin" target="_blank" class="hover:text-gh-blue transition-colors">
        LinkedIn
      </a>
      <span>•</span>
      <a [href]="personalInfo.github" target="_blank" class="hover:text-gh-blue transition-colors">
        GitHub
      </a>
    </div>
    <div class="flex flex-wrap justify-center gap-4">
      <button
        (click)="downloadResume()"
        class="px-6 py-3 bg-gh-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Download Resume PDF
      </button>
      <a
        href="/cover-letter/software-engineer"
        class="px-6 py-3 bg-white text-gh-dark font-semibold rounded-lg border border-gh-border hover:bg-gh-bg transition-colors shadow-md"
      >
        View Cover Letters
      </a>
    </div>
  </section>

  <!-- Professional Summary Section -->
  <section id="summary" class="py-12">
    <h2 class="text-3xl font-bold text-gh-dark mb-6 border-b-2 border-gh-border pb-2">
      Professional Summary
    </h2>
    <div class="bg-white border border-gh-border rounded-lg p-6">
      <p class="text-lg text-gh-dark leading-relaxed">
        {{ personalInfo.summary }}
      </p>
      <div class="flex flex-wrap gap-4 mt-4 text-gh-blue font-semibold">
        <span>12+ years experience</span>
        <span>•</span>
        <span>Angular Expert</span>
        <span>•</span>
        <span>Full Stack Developer</span>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-12">
    <h2 class="text-3xl font-bold text-gh-dark mb-6 border-b-2 border-gh-border pb-2">
      Technical Skills
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div *ngFor="let category of skillCategories" class="bg-white border border-gh-border rounded-lg p-6">
        <h3 class="text-xl font-bold text-gh-dark mb-4">{{ category.name }}</h3>
        <app-skill-bar
          *ngFor="let skill of category.skills"
          [skill]="skill"
        ></app-skill-bar>
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section id="experience" class="py-12">
    <h2 class="text-3xl font-bold text-gh-dark mb-6 border-b-2 border-gh-border pb-2">
      Professional Experience
    </h2>
    <div class="space-y-8">
      <app-timeline-item
        *ngFor="let exp of experiences; let last = last"
        [experience]="exp"
        [isLast]="last"
      ></app-timeline-item>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="py-12">
    <h2 class="text-3xl font-bold text-gh-dark mb-6 border-b-2 border-gh-border pb-2">
      Featured Projects
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <app-project-card
        *ngFor="let project of projects"
        [project]="project"
      ></app-project-card>
    </div>
  </section>

  <!-- Education Section -->
  <section id="education" class="py-12">
    <h2 class="text-3xl font-bold text-gh-dark mb-6 border-b-2 border-gh-border pb-2">
      Education
    </h2>
    <div class="space-y-4">
      <div
        *ngFor="let edu of education"
        class="bg-white border border-gh-border rounded-lg p-6"
      >
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 class="text-lg font-bold text-gh-dark">{{ edu.degree }}</h3>
            <p class="text-gh-light">{{ edu.institution }}, {{ edu.location }}</p>
            <p class="text-sm text-gh-light mt-1">Graduated: {{ edu.graduationYear }}</p>
          </div>
          <div class="mt-2 sm:mt-0">
            <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
              {{ edu.percentage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- Back to Top Button -->
<button
  *ngIf="showBackToTop"
  (click)="scrollToTop()"
  class="fixed bottom-8 right-8 w-12 h-12 bg-gh-blue text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
  aria-label="Back to top"
>
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
  </svg>
</button>

<app-footer></app-footer>
```

- [ ] **Step 3: Verify resume component files created**

Run: `ls -la resume-platform/src/app/features/resume/`

Expected: Both `.ts` and `.html` files exist

- [ ] **Step 4: Commit resume component**

```bash
git add resume-platform/src/app/features/resume/
git commit -m "feat: add resume page component with all sections"
```

---

## Task 7: Create Cover Letter Page Component

**Files:**
- Create: `resume-platform/src/app/features/cover-letter/cover-letter.component.ts`
- Create: `resume-platform/src/app/features/cover-letter/cover-letter.component.html`

- [ ] **Step 1: Create cover-letter component TypeScript file**

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { COVER_LETTERS } from '../../core/data/cover-letters.data';
import { PERSONAL_INFO } from '../../core/data/personal-info.data';
import { CoverLetter } from '../../core/models/cover-letter.model';
import { PdfService } from '../../core/services/pdf.service';

@Component({
  selector: 'app-cover-letter',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './cover-letter.component.html'
})
export class CoverLetterComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pdfService = inject(PdfService);

  personalInfo = PERSONAL_INFO;
  coverLetter: CoverLetter | null = null;
  availableTemplates = COVER_LETTERS;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const type = params['type'];
      this.loadCoverLetter(type);
    });
  }

  loadCoverLetter(type: string): void {
    this.coverLetter = COVER_LETTERS.find(cl => cl.type === type) || null;
    if (!this.coverLetter) {
      this.router.navigate(['/']);
    }
  }

  downloadPdf(): void {
    if (this.coverLetter) {
      this.pdfService.generateCoverLetterPdf(this.coverLetter, this.personalInfo);
    }
  }

  switchTemplate(type: string): void {
    this.router.navigate(['/cover-letter', type]);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
```

- [ ] **Step 2: Create cover-letter component HTML template**

```html
<app-header></app-header>

<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div *ngIf="coverLetter" class="bg-white border border-gh-border rounded-lg shadow-lg p-8 md:p-12">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-gh-border">
      <a
        routerLink="/"
        class="text-gh-blue hover:underline mb-4 sm:mb-0"
      >
        ← Back to Resume
      </a>
      <div class="flex flex-col sm:flex-row gap-3">
        <select
          (change)="switchTemplate($any($event.target).value)"
          [value]="coverLetter.type"
          class="px-4 py-2 border border-gh-border rounded-lg text-gh-dark bg-white hover:bg-gh-bg transition-colors"
        >
          <option *ngFor="let template of availableTemplates" [value]="template.type">
            {{ template.title }}
          </option>
        </select>
        <button
          (click)="downloadPdf()"
          class="px-6 py-2 bg-gh-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>

    <!-- Cover Letter Content -->
    <div class="space-y-6">
      <!-- Header with Contact Info (Right-aligned) -->
      <div class="text-right mb-8">
        <p class="font-bold text-gh-dark">{{ personalInfo.name }}</p>
        <p class="text-gh-light">{{ personalInfo.email }}</p>
        <p class="text-gh-light">{{ personalInfo.phone }}</p>
        <p class="text-gh-light">{{ personalInfo.location }}</p>
      </div>

      <!-- Date -->
      <div class="mb-6">
        <p class="text-gh-dark">{{ getCurrentDate() }}</p>
      </div>

      <!-- Greeting -->
      <div class="mb-6">
        <p class="text-gh-dark">{{ coverLetter.greeting }}</p>
      </div>

      <!-- Body Paragraphs -->
      <div class="space-y-4">
        <p
          *ngFor="let paragraph of coverLetter.paragraphs"
          class="text-gh-dark leading-relaxed text-justify"
        >
          {{ paragraph }}
        </p>
      </div>

      <!-- Closing -->
      <div class="mt-8 space-y-4">
        <p class="text-gh-dark">{{ coverLetter.closing }}</p>
        <div class="text-gh-dark whitespace-pre-line">
          {{ coverLetter.signature }}
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 pt-6 border-t border-gh-border text-center">
        <p class="text-sm text-gh-light">
          Generated from <a href="/" class="text-gh-blue hover:underline">tusharsahu.github.io/resume-platform</a>
        </p>
      </div>
    </div>
  </div>
</main>

<app-footer></app-footer>
```

- [ ] **Step 3: Verify cover-letter component files created**

Run: `ls -la resume-platform/src/app/features/cover-letter/`

Expected: Both `.ts` and `.html` files exist

- [ ] **Step 4: Commit cover-letter component**

```bash
git add resume-platform/src/app/features/cover-letter/
git commit -m "feat: add cover-letter page component with templates"
```

---

## Task 8: Configure Routes and App Component

**Files:**
- Modify: `resume-platform/src/app/app.routes.ts`
- Modify: `resume-platform/src/app/app.ts`
- Modify: `resume-platform/src/app/app.html`

- [ ] **Step 1: Update app routes configuration**

```typescript
import { Routes } from '@angular/router';
import { ResumeComponent } from './features/resume/resume.component';
import { CoverLetterComponent } from './features/cover-letter/cover-letter.component';

export const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: 'cover-letter/:type', component: CoverLetterComponent },
  { path: '**', redirectTo: '' }
];
```

- [ ] **Step 2: Update app component TypeScript file**

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'resume-platform';
}
```

- [ ] **Step 3: Update app component HTML template**

```html
<router-outlet></router-outlet>
```

- [ ] **Step 4: Clear app component CSS**

Run: `echo "" > resume-platform/src/app/app.css`

Expected: Empty CSS file

- [ ] **Step 5: Verify routing configuration**

Run: `cat resume-platform/src/app/app.routes.ts`

Expected: Routes array with resume and cover-letter paths

- [ ] **Step 6: Commit routing configuration**

```bash
git add resume-platform/src/app/app.routes.ts resume-platform/src/app/app.ts resume-platform/src/app/app.html resume-platform/src/app/app.css
git commit -m "feat: configure routes and update app component"
```

---

## Task 9: Test Application Locally

**Files:**
- None (testing only)

- [ ] **Step 1: Install dependencies**

Run: `cd resume-platform && npm install`

Expected: All packages installed successfully

- [ ] **Step 2: Start development server**

Run: `npm start`

Expected: Server starts on http://localhost:4200

- [ ] **Step 3: Verify home page loads**

Open browser to: `http://localhost:4200`

Expected: Resume page displays with all sections (hero, summary, skills, experience, projects, education)

- [ ] **Step 4: Test smooth scroll navigation**

Click on each navigation link in header

Expected: Page smoothly scrolls to each section

- [ ] **Step 5: Test skill bar animations**

Scroll to skills section

Expected: Skill bars animate from 0 to their proficiency percentage

- [ ] **Step 6: Test mobile responsive design**

Open browser dev tools, toggle device toolbar, test mobile view

Expected: Mobile menu appears, layout adjusts for mobile

- [ ] **Step 7: Test cover letter navigation**

Click "View Cover Letters" button, test all three templates

Expected: Each cover letter template displays correctly with proper routing

- [ ] **Step 8: Test PDF downloads**

Click "Download Resume PDF" and "Download PDF" on cover letter pages

Expected: PDFs generate and download successfully

- [ ] **Step 9: Check console for errors**

Open browser console

Expected: No errors in console

- [ ] **Step 10: Stop development server**

Run: Press Ctrl+C in terminal

Expected: Server stops

---

## Task 10: Configure for GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `resume-platform/angular.json`

- [ ] **Step 1: Create GitHub Actions workflow directory**

Run: `mkdir -p .github/workflows`

Expected: Directory created

- [ ] **Step 2: Create deployment workflow file**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: 'resume-platform/package-lock.json'
      
      - name: Install dependencies
        working-directory: ./resume-platform
        run: npm ci
      
      - name: Build
        working-directory: ./resume-platform
        run: npm run build -- --configuration production --base-href /resume-platform/
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './resume-platform/dist/resume-platform/browser'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Update angular.json for GitHub Pages**

Find the `projects.resume-platform.architect.build.options` section and verify/add:

```json
"outputPath": "dist/resume-platform/browser"
```

Note: Base href is set in the workflow, no need to modify angular.json for it

- [ ] **Step 4: Verify deployment files**

Run: `ls -la .github/workflows/`

Expected: `deploy.yml` file exists

- [ ] **Step 5: Commit deployment configuration**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Pages deployment workflow"
```

---

## Task 11: Create README and Final Documentation

**Files:**
- Create: `README.md`
- Modify: `resume-platform/package.json` (add description)

- [ ] **Step 1: Create README file**

```markdown
# AI-Powered Resume Platform

A modern, GitHub-style resume website built with Angular 20, TypeScript, and Tailwind CSS. Features PDF export, multiple cover letter templates, and responsive design.

## 🚀 Features

- ✅ Single-page scrolling resume with smooth navigation
- ✅ Animated skill proficiency bars with GitHub aesthetic
- ✅ Timeline view for professional experience
- ✅ Featured projects showcase with GitHub stats integration
- ✅ Multiple cover letter templates (Software Engineer, Lead Developer, Startup)
- ✅ Professional PDF generation for resume and cover letters
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Deployed to GitHub Pages with automated CI/CD

## 🛠️ Tech Stack

- **Framework:** Angular 20 (standalone components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with GitHub-style theme
- **PDF Generation:** jsPDF + jsPDF-autotable
- **HTTP Client:** Angular HttpClient (GitHub API integration)
- **Deployment:** GitHub Pages with GitHub Actions

## 📁 Project Structure

```
resume-platform/
├── src/app/
│   ├── core/               # Core functionality
│   │   ├── data/           # Resume data files
│   │   ├── models/         # TypeScript interfaces
│   │   └── services/       # Business logic services
│   ├── shared/             # Reusable components
│   │   └── components/     # Skill bars, project cards, timeline
│   └── features/           # Feature modules
│       ├── resume/         # Main resume page
│       └── cover-letter/   # Cover letter templates
└── docs/                   # Design specs and plans
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd resume-platform
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`

### Build for Production

```bash
npm run build -- --configuration production
```

## 📝 Updating Resume Data

All resume content is managed through TypeScript files in `src/app/core/data/`:

- **personal-info.data.ts** - Name, contact info, summary
- **experience.data.ts** - Work history and achievements
- **skills.data.ts** - Technical skills with proficiency levels
- **projects.data.ts** - Featured projects
- **education.data.ts** - Educational background
- **cover-letters.data.ts** - Cover letter templates

Simply edit these files and rebuild to update your resume.

## 🚢 Deployment

The project is configured for automatic deployment to GitHub Pages. On every push to `main`:

1. GitHub Actions runs the build
2. Artifacts are deployed to `gh-pages` branch
3. Site goes live at `https://[username].github.io/resume-platform/`

## 📄 License

© 2026 Tushar Sahu. All rights reserved.

## 🤝 Contributing

This is a personal resume project. Feel free to fork and customize for your own use!

---

Built with ❤️ using Angular + TypeScript
```

- [ ] **Step 2: Update package.json description**

In `resume-platform/package.json`, update the top section:

```json
{
  "name": "resume-platform",
  "version": "1.0.0",
  "description": "AI-Powered Resume Platform - GitHub-style resume website with PDF export",
```

- [ ] **Step 3: Verify README created**

Run: `ls -la | grep README`

Expected: README.md file exists

- [ ] **Step 4: Commit documentation**

```bash
git add README.md resume-platform/package.json
git commit -m "docs: add README and project documentation"
```

---

## Task 12: Final Integration Test and Push

**Files:**
- None (testing and deployment)

- [ ] **Step 1: Run full production build**

Run: `cd resume-platform && npm run build -- --configuration production`

Expected: Build completes successfully with no errors

- [ ] **Step 2: Check build output size**

Run: `ls -lh resume-platform/dist/resume-platform/browser/`

Expected: Build artifacts exist, main bundle < 500KB

- [ ] **Step 3: Test production build locally**

Run: `npx http-server resume-platform/dist/resume-platform/browser -p 8080`

Then open browser to: `http://localhost:8080`

Expected: Production build loads correctly

- [ ] **Step 4: Verify all features work in production build**

Test checklist:
- Navigation smooth scroll works
- Skill bars animate
- Project cards expand/collapse
- Timeline items expand/collapse
- Cover letter templates load
- Back to top button appears after scrolling
- Mobile menu works
- PDF downloads work

Expected: All features functional

- [ ] **Step 5: Stop test server**

Run: Press Ctrl+C in terminal

Expected: Server stops

- [ ] **Step 6: Review all commits**

Run: `git log --oneline -20`

Expected: See all commits from this implementation

- [ ] **Step 7: Push to GitHub**

Run: `git push origin main`

Expected: Code pushed successfully, GitHub Actions workflow triggered

- [ ] **Step 8: Monitor GitHub Actions**

Navigate to GitHub repository > Actions tab

Expected: Workflow runs and completes successfully

- [ ] **Step 9: Verify deployment**

Navigate to: `https://[username].github.io/resume-platform/`

Expected: Live site loads successfully

- [ ] **Step 10: Final smoke test on live site**

Test all key features on live deployment

Expected: All features work on live site

---

## Self-Review

### Spec Coverage Check

✅ **Main Resume Page** - Task 6 implements single scrolling page with all sections
✅ **Hero Section** - Implemented in resume.component.html with profile photo, contact info, CTA buttons
✅ **Professional Summary** - Implemented with highlights
✅ **Skills Section** - Tasks 3 & 6 implement dashboard-style skill bars with animations
✅ **Experience Section** - Tasks 5 & 6 implement timeline view with expandable details
✅ **Projects Section** - Tasks 4 & 6 implement project cards with GitHub stats integration
✅ **Education Section** - Implemented in resume.component.html
✅ **Navigation Header** - Task 1 implements sticky header with smooth scroll
✅ **Footer** - Task 2 implements footer with social links
✅ **Cover Letter Pages** - Task 7 implements three template types
✅ **GitHub Integration** - Service already exists, integrated in Task 4 (project-card)
✅ **PDF Generation** - Services already exist, integrated in Tasks 6 & 7
✅ **Smooth Scroll** - Service already exists, integrated in Task 1 (header)
✅ **Responsive Design** - All components use Tailwind responsive classes
✅ **GitHub Pages Deployment** - Task 10 configures GitHub Actions workflow
✅ **Routing** - Task 8 configures routes for resume and cover letters
✅ **Back to Top Button** - Implemented in Task 6 (resume.component.html)

### Placeholder Check

✅ No "TBD" or "TODO" placeholders
✅ All code blocks complete with actual implementation
✅ All file paths are exact and absolute
✅ All commands include expected output
✅ No generic "add error handling" without showing code
✅ No "similar to Task N" references - all code is explicit

### Type Consistency Check

✅ `PersonalInfo` interface used consistently across components
✅ `Experience` model matches usage in timeline-item component
✅ `Skill` model matches usage in skill-bar component
✅ `Project` model matches usage in project-card component
✅ `CoverLetter` model matches usage in cover-letter component
✅ Service method signatures match component usage
✅ Data imports use correct constant names (PERSONAL_INFO, EXPERIENCES, etc.)

---

## Plan Complete

**Plan saved to:** `docs/superpowers/plans/2026-05-05-resume-platform-implementation.md`

**Execution Options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
