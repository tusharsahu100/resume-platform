import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { PersonalInfo } from '../models/personal-info.model';
import { Experience } from '../models/experience.model';
import { Skill } from '../models/skill.model';
import { Education } from '../models/education.model';
import { Project } from '../models/project.model';
import { CoverLetter } from '../models/cover-letter.model';

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: Skill[];
  education: Education[];
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly PAGE_MARGIN = 0.75; // inches
  private readonly LINE_HEIGHT = 0.25; // inches
  private readonly PAGE_HEIGHT = 11; // inches (letter size)
  private readonly MAX_Y = 9.5; // inches (safe content area)

  private checkPageBreak(doc: jsPDF, yPos: number): number {
    if (yPos > this.MAX_Y) {
      doc.addPage();
      return this.PAGE_MARGIN;
    }
    return yPos;
  }

  generateResumePdf(data: ResumeData): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    let yPos = this.PAGE_MARGIN;

    // Header
    yPos = this.addHeader(doc, data.personalInfo, yPos);
    yPos += 0.2;

    // Professional Summary
    yPos = this.addSection(doc, 'PROFESSIONAL SUMMARY', yPos);
    yPos = this.addText(doc, data.personalInfo.summary, yPos, 0.75, 7);
    yPos += 0.3;

    // Skills
    yPos = this.addSection(doc, 'CORE SKILLS', yPos);
    yPos = this.addSkills(doc, data.skills, yPos);
    yPos += 0.3;

    // Experience
    yPos = this.addSection(doc, 'PROFESSIONAL EXPERIENCE', yPos);
    yPos = this.addExperiences(doc, data.experiences, yPos);

    // Check if we need a new page
    if (yPos > 9.5) {
      doc.addPage();
      yPos = this.PAGE_MARGIN;
    }

    yPos += 0.3;

    // Projects
    yPos = this.addSection(doc, 'FEATURED PROJECTS', yPos);
    yPos = this.addProjects(doc, data.projects, yPos);

    // Check if we need a new page
    if (yPos > 9.5) {
      doc.addPage();
      yPos = this.PAGE_MARGIN;
    }

    yPos += 0.3;

    // Education
    yPos = this.addSection(doc, 'EDUCATION', yPos);
    yPos = this.addEducation(doc, data.education, yPos);

    // Footer
    this.addFooter(doc);

    // Save with dynamic filename
    const fileName = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    doc.save(fileName);
  }

  generateCoverLetterPdf(coverLetter: CoverLetter, personalInfo: PersonalInfo): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    let yPos = this.PAGE_MARGIN;

    // Header with contact info (right-aligned)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    const headerLines = [
      personalInfo.name,
      personalInfo.email,
      personalInfo.phone,
      personalInfo.location
    ];

    headerLines.forEach(line => {
      const textWidth = doc.getTextWidth(line);
      doc.text(line, 8.5 - this.PAGE_MARGIN - textWidth, yPos);
      yPos += this.LINE_HEIGHT;
    });

    yPos += 0.3;

    // Date
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(today, this.PAGE_MARGIN, yPos);
    yPos += 0.5;

    // Greeting
    doc.text(coverLetter.greeting, this.PAGE_MARGIN, yPos);
    yPos += 0.4;

    // Body paragraphs
    doc.setFontSize(11);
    coverLetter.paragraphs.forEach(paragraph => {
      yPos = this.addText(doc, paragraph, yPos, this.PAGE_MARGIN, 7);
      yPos += 0.3;
    });

    // Closing
    yPos += 0.2;
    doc.text(coverLetter.closing, this.PAGE_MARGIN, yPos);
    yPos += 0.3;

    // Signature
    const signatureLines = coverLetter.signature.split('\n');
    signatureLines.forEach(line => {
      doc.text(line, this.PAGE_MARGIN, yPos);
      yPos += this.LINE_HEIGHT;
    });

    // Footer
    yPos = 10.5;
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated from tusharsahu.github.io/resume-platform', this.PAGE_MARGIN, yPos);

    // Save with formatted filename
    const typeFormatted = coverLetter.type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('_');
    const fileName = `${personalInfo.name.replace(/\s+/g, '_')}_CoverLetter_${typeFormatted}.pdf`;
    doc.save(fileName);
  }

  private addHeader(doc: jsPDF, info: PersonalInfo, yPos: number): number {
    // Name
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(info.name, this.PAGE_MARGIN, yPos);
    yPos += 0.35;

    // Title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${info.role} @ ${info.company}`, this.PAGE_MARGIN, yPos);
    yPos += 0.3;

    // Contact info
    doc.setFontSize(10);
    const contactLine = `${info.email} | ${info.phone} | ${info.location}`;
    doc.text(contactLine, this.PAGE_MARGIN, yPos);
    yPos += 0.2;

    // Links
    doc.setTextColor(9, 105, 218); // GitHub blue
    const linksLine = `LinkedIn: ${info.linkedin} | GitHub: ${info.github}`;
    doc.textWithLink(linksLine, this.PAGE_MARGIN, yPos, { url: info.linkedin });
    doc.setTextColor(0, 0, 0);
    yPos += 0.25;

    return yPos;
  }

  private addSection(doc: jsPDF, title: string, yPos: number): number {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, this.PAGE_MARGIN, yPos);
    yPos += 0.05;

    // Underline
    doc.setLineWidth(0.01);
    doc.line(this.PAGE_MARGIN, yPos, 8.5 - this.PAGE_MARGIN, yPos);
    yPos += 0.2;

    return yPos;
  }

  private addText(
    doc: jsPDF,
    text: string,
    yPos: number,
    xPos: number,
    maxWidth: number
  ): number {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, xPos, yPos);
    return yPos + (lines.length * this.LINE_HEIGHT);
  }

  private addSkills(doc: jsPDF, skills: Skill[], yPos: number): number {
    const categories = ['Frontend', 'Backend', 'Tools', 'Other'];

    categories.forEach(category => {
      const categorySkills = skills.filter(s => s.category === category);
      if (categorySkills.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(`${category}:`, this.PAGE_MARGIN, yPos);
        yPos += 0.2;

        doc.setFont('helvetica', 'normal');
        const skillNames = categorySkills.map(s => s.name).join(', ');
        yPos = this.addText(doc, skillNames, yPos, this.PAGE_MARGIN + 0.25, 6.75);
        yPos += 0.15;
      }
    });

    return yPos;
  }

  private addExperiences(doc: jsPDF, experiences: Experience[], yPos: number): number {
    experiences.forEach((exp, index) => {
      // Check page break before each experience
      yPos = this.checkPageBreak(doc, yPos);

      // Company & Role
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(exp.company, this.PAGE_MARGIN, yPos);
      yPos += 0.2;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(exp.role, this.PAGE_MARGIN, yPos);

      // Duration (right-aligned)
      doc.setFont('helvetica', 'normal');
      const durationWidth = doc.getTextWidth(exp.duration);
      doc.text(exp.duration, 8.5 - this.PAGE_MARGIN - durationWidth, yPos);
      yPos += 0.2;

      // Location
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(exp.location, this.PAGE_MARGIN, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 0.25;

      // Description bullets
      doc.setFontSize(10);
      exp.description.forEach(desc => {
        doc.text('•', this.PAGE_MARGIN + 0.1, yPos);
        yPos = this.addText(doc, desc, yPos, this.PAGE_MARGIN + 0.3, 6.7);
        yPos += 0.05;
      });

      // Technologies
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      const techText = `Technologies: ${exp.technologies.join(', ')}`;
      yPos = this.addText(doc, techText, yPos, this.PAGE_MARGIN + 0.1, 6.9);

      if (index < experiences.length - 1) {
        yPos += 0.25;
      }
    });

    return yPos;
  }

  private addProjects(doc: jsPDF, projects: Project[], yPos: number): number {
    const featured = projects.filter(p => p.featured);

    featured.forEach((project, index) => {
      // Check page break before each project
      yPos = this.checkPageBreak(doc, yPos);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(project.name, this.PAGE_MARGIN, yPos);
      yPos += 0.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      yPos = this.addText(doc, project.description, yPos, this.PAGE_MARGIN + 0.1, 6.9);
      yPos += 0.15;

      doc.setFont('helvetica', 'italic');
      const techText = `Tech Stack: ${project.techStack.join(', ')}`;
      yPos = this.addText(doc, techText, yPos, this.PAGE_MARGIN + 0.1, 6.9);

      if (index < featured.length - 1) {
        yPos += 0.2;
      }
    });

    return yPos;
  }

  private addEducation(doc: jsPDF, education: Education[], yPos: number): number {
    education.forEach((edu, index) => {
      // Check page break before each education entry
      yPos = this.checkPageBreak(doc, yPos);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(edu.degree, this.PAGE_MARGIN, yPos);
      yPos += 0.2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`${edu.institution}, ${edu.location}`, this.PAGE_MARGIN + 0.1, yPos);

      if (edu.percentage) {
        const percentText = `${edu.percentage}`;
        const percentWidth = doc.getTextWidth(percentText);
        doc.text(percentText, 8.5 - this.PAGE_MARGIN - percentWidth, yPos);
      }
      yPos += 0.2;

      doc.setTextColor(128, 128, 128);
      doc.text(`Graduated: ${edu.graduationYear}`, this.PAGE_MARGIN + 0.1, yPos);
      doc.setTextColor(0, 0, 0);

      if (index < education.length - 1) {
        yPos += 0.2;
      }
    });

    return yPos;
  }

  private addFooter(doc: jsPDF): void {
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    const footerText = 'Built with Angular + TypeScript | tusharsahu.github.io/resume-platform';
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (8.5 - footerWidth) / 2, 10.5);
  }
}
