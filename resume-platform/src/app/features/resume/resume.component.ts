import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
    RouterLink,
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
    { name: 'Leadership', skills: this.skills.filter(s => s.category === 'Leadership') },
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
