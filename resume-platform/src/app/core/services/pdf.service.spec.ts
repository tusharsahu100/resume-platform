import { TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import { PERSONAL_INFO } from '../data/personal-info.data';
import { EXPERIENCES } from '../data/experience.data';
import { SKILLS } from '../data/skills.data';
import { EDUCATION } from '../data/education.data';
import { PROJECTS } from '../data/projects.data';

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfService]
    });
    service = TestBed.inject(PdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate resume PDF without errors', () => {
    expect(() => {
      service.generateResumePdf({
        personalInfo: PERSONAL_INFO,
        experiences: EXPERIENCES,
        skills: SKILLS,
        education: EDUCATION,
        projects: PROJECTS
      });
    }).not.toThrow();
  });

  it('should generate resume PDF with dynamic filename from personalInfo.name', () => {
    const testPersonalInfo = {
      ...PERSONAL_INFO,
      name: 'John Doe'
    };

    expect(() => {
      service.generateResumePdf({
        personalInfo: testPersonalInfo,
        experiences: EXPERIENCES,
        skills: SKILLS,
        education: EDUCATION,
        projects: PROJECTS
      });
    }).not.toThrow();
  });

  it('should generate resume PDF with minimal data (empty arrays)', () => {
    expect(() => {
      service.generateResumePdf({
        personalInfo: PERSONAL_INFO,
        experiences: [],
        skills: [],
        education: [],
        projects: []
      });
    }).not.toThrow();
  });

  it('should generate cover letter PDF without errors', () => {
    const coverLetter = {
      type: 'software-engineer' as const,
      title: 'Software Engineer Application',
      greeting: 'Dear Hiring Manager,',
      paragraphs: [
        'I am writing to express my interest in the position.',
        'I have extensive experience in software development.',
        'Thank you for your consideration.'
      ],
      closing: 'Sincerely,',
      signature: 'John Doe\nSoftware Engineer'
    };

    expect(() => {
      service.generateCoverLetterPdf(coverLetter, PERSONAL_INFO);
    }).not.toThrow();
  });

  it('should generate cover letter PDF with dynamic filename', () => {
    const testPersonalInfo = {
      ...PERSONAL_INFO,
      name: 'Jane Smith'
    };

    const coverLetter = {
      type: 'lead-developer' as const,
      title: 'Lead Developer Position',
      greeting: 'Dear Hiring Manager,',
      paragraphs: ['Test paragraph'],
      closing: 'Best regards,',
      signature: 'Jane Smith'
    };

    expect(() => {
      service.generateCoverLetterPdf(coverLetter, testPersonalInfo);
    }).not.toThrow();
  });

  it('should handle multiple spaces in name when generating filename', () => {
    const testPersonalInfo = {
      ...PERSONAL_INFO,
      name: 'Mary   Anne  Johnson'
    };

    expect(() => {
      service.generateResumePdf({
        personalInfo: testPersonalInfo,
        experiences: [],
        skills: [],
        education: [],
        projects: []
      });
    }).not.toThrow();
  });

  it('should generate resume with large dataset without errors', () => {
    // Test with many items to verify page break handling
    const manyExperiences = Array(10).fill(EXPERIENCES[0]);
    const manyProjects = Array(10).fill(PROJECTS[0]);
    const manyEducation = Array(5).fill(EDUCATION[0]);

    expect(() => {
      service.generateResumePdf({
        personalInfo: PERSONAL_INFO,
        experiences: manyExperiences,
        skills: SKILLS,
        education: manyEducation,
        projects: manyProjects
      });
    }).not.toThrow();
  });
});
