import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { COVER_LETTERS } from '../../core/data/cover-letters.data';
import { PERSONAL_INFO } from '../../core/data/personal-info.data';
import { CoverLetter } from '../../core/models/cover-letter.model';
import { PdfService } from '../../core/services/pdf.service';

@Component({
  selector: 'app-cover-letter',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
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
