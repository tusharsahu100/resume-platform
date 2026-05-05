import { Routes } from '@angular/router';
import { ResumeComponent } from './features/resume/resume.component';
import { CoverLetterComponent } from './features/cover-letter/cover-letter.component';

export const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: 'cover-letter/:type', component: CoverLetterComponent },
  { path: '**', redirectTo: '' }
];
