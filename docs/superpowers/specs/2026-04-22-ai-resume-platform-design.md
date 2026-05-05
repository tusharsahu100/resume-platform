# AI-Powered Resume Platform - Design Specification

**Date:** 2026-04-22  
**Author:** Tushar Sahu  
**Status:** Approved

## Context

This project builds a modern, GitHub-style resume website to showcase Tushar Sahu's 12+ years of software engineering experience. The platform demonstrates technical expertise in Angular, TypeScript, and modern web development while serving as a professional online resume.

**Why this project:**
- Create a shareable, professional online presence for job applications
- Showcase full-stack development skills (Angular + Node.js concepts)
- Demonstrate ability to build polished, production-ready applications
- Stand out with a custom-built platform instead of generic resume builders
- Easy to maintain and update via TypeScript constants

**Target audience:** Software engineering recruiters and hiring managers at tech companies, with emphasis on Angular/frontend expertise.

---

## Scope

### In Scope
✅ GitHub-style resume website with dashboard elements  
✅ Professional PDF export (resume + cover letters)  
✅ Multiple cover letter templates (3 variations)  
✅ Project showcase with GitHub API integration  
✅ Responsive design (mobile, tablet, desktop)  
✅ Deployment to GitHub Pages  
✅ TypeScript-based data management

### Out of Scope
❌ Backend server (pure static site)  
❌ User authentication or accounts  
❌ AI-powered content generation (static templates only)  
❌ Database or data persistence  
❌ Analytics or visitor tracking  
❌ Contact form or email integration  
❌ Blog or content management system

---

## Technology Stack

### Core Framework
- **Angular:** 17+ (latest stable with standalone components)
- **TypeScript:** Strict mode enabled
- **Node.js:** 18+ (for development only)

### Libraries & Tools
- **Styling:** Tailwind CSS (utility-first, GitHub-style theming)
- **PDF Generation:** jsPDF + jsPDF-autotable
- **HTTP Client:** Angular HttpClient (for GitHub API)
- **Routing:** Angular Router
- **Icons:** Heroicons or Lucide (consistent with GitHub aesthetic)

### Development Tools
- **IDE:** WebStorm or VS Code
- **Package Manager:** npm
- **Build Tool:** Angular CLI
- **Version Control:** Git + GitHub
- **Deployment:** GitHub Pages with GitHub Actions

### External APIs
- **GitHub REST API:** Fetch repository stats (stars, forks, language)
  - Endpoint: `https://api.github.com/repos/{owner}/{repo}`
  - Rate limit: 60 requests/hour (unauthenticated)
  - Caching strategy: 1-hour cache per repo

---

## Architecture

### Approach: Hybrid SPA

**Main Resume Page:** Single scrolling page with anchor navigation  
**Cover Letters:** Separate routes for each template  
**Modals/Overlays:** PDF generation actions

### Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── experience.model.ts
│   │   │   ├── skill.model.ts
│   │   │   ├── project.model.ts
│   │   │   ├── education.model.ts
│   │   │   └── cover-letter.model.ts
│   │   ├── services/
│   │   │   ├── github.service.ts       # GitHub API integration
│   │   │   ├── pdf.service.ts          # PDF generation
│   │   │   └── scroll.service.ts       # Smooth scroll navigation
│   │   └── data/
│   │       ├── resume-data.ts           # Personal info, experience, education
│   │       ├── skills-data.ts           # Skills with proficiency levels
│   │       ├── projects-data.ts         # Featured projects
│   │       └── cover-letters-data.ts    # Cover letter templates
│   ├── shared/
│   │   └── components/
│   │       ├── header/                  # Navigation header
│   │       ├── footer/                  # Footer with social links
│   │       ├── skill-bar/               # Animated skill proficiency bar
│   │       ├── project-card/            # Project card with GitHub stats
│   │       ├── experience-timeline/     # Timeline view for work history
│   │       └── section-container/       # Reusable section wrapper
│   ├── features/
│   │   ├── resume/
│   │   │   ├── resume.component.ts      # Main resume page
│   │   │   ├── hero-section/
│   │   │   ├── summary-section/
│   │   │   ├── skills-section/
│   │   │   ├── experience-section/
│   │   │   ├── projects-section/
│   │   │   └── education-section/
│   │   └── cover-letter/
│   │       ├── cover-letter.component.ts # Cover letter template display
│   │       └── cover-letter-routing.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   ├── images/
│   │   ├── profile-photo.jpg
│   │   └── projects/                    # Project screenshots
│   └── fonts/                           # Custom fonts if needed
└── styles/
    ├── styles.css                       # Global Tailwind imports
    └── print.css                        # Print-specific styles

```

### Routing Structure

```typescript
const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: 'cover-letter/software-engineer', component: CoverLetterComponent, data: { type: 'software-engineer' } },
  { path: 'cover-letter/lead-developer', component: CoverLetterComponent, data: { type: 'lead-developer' } },
  { path: 'cover-letter/startup', component: CoverLetterComponent, data: { type: 'startup' } },
  { path: '**', redirectTo: '' }
];
```

---

## Data Models

### Experience Model
```typescript
export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  startDate: Date;
  endDate?: Date;
  description: string[];
  technologies: string[];
  achievements?: string[];
}
```

### Skill Model
```typescript
export interface Skill {
  category: 'Frontend' | 'Backend' | 'Tools' | 'Other';
  name: string;
  proficiency: number;  // 0-100
  yearsOfExperience?: number;
}
```

### Project Model
```typescript
export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubRepo?: string;      // Format: "username/repo-name"
  liveUrl?: string;
  featured: boolean;
  imageUrl?: string;
  // GitHub stats (fetched dynamically):
  stars?: number;
  forks?: number;
  language?: string;
  lastUpdated?: string;
}
```

### Cover Letter Model
```typescript
export interface CoverLetter {
  type: string;             // 'software-engineer', 'lead-developer', 'startup'
  title: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}
```

### Education Model
```typescript
export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  graduationYear: number;
  percentage?: string;
}
```

---

## Features & Components

### 1. Main Resume Page (`ResumeComponent`)

**Single scrolling page with sections:**

#### Hero Section
- Large circular profile photo (150px diameter)
- Name in large typography (48px)
- Current role: "Specialist Software Engineer @ NICE Systems"
- Contact info with icons: Email, Phone, LinkedIn, GitHub
- CTA buttons:
  - "Download Resume PDF" (primary button)
  - "View Cover Letters" (secondary button)
- Background: Subtle gradient (white to light blue)

#### Professional Summary Section
- 3-4 sentence elevator pitch
- Highlights: "12+ years experience | Angular Expert | Full Stack Developer"
- Clean, centered text

#### Skills Section (Dashboard Element)
- **Visual:** Horizontal bar charts showing proficiency (0-100%)
- Grouped by category:
  - Frontend: Angular, JavaScript, HTML5, CSS3, Bootstrap, jQuery
  - Backend: Node.js, Express.js, MongoDB
  - Tools: Git, WebStorm, VS Code, Jasmine, Karma
- Color-coded bars by category
- Animated on scroll (bars fill from 0 to percentage)
- Smooth transitions using CSS animations

#### Experience Section (Timeline View)
- Vertical timeline with connecting line
- Each entry:
  - Circular node on timeline
  - Company name, role, duration
  - Location
  - Key achievements (bullet points)
  - Technologies used (badges)
- Most recent at top
- Expandable "Show more" for detailed descriptions
- GitHub-style cards for each position

#### Projects Section (Hybrid Approach)
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Each project card:
  - Project thumbnail/screenshot
  - Name and short description
  - Tech stack badges
  - GitHub stats (if repo provided): stars, forks, language badge
  - "Last updated" timestamp
  - Links: "View Code" (GitHub) | "Live Demo" (if available)
- Hover effects: subtle elevation and shadow
- Click to expand for full description

#### Education Section
- Simple, clean list format
- Each entry: Degree, Institution, Year, Percentage
- Minimal styling (not a primary focus)

#### Footer
- Social links (LinkedIn, GitHub, Email)
- "Built with Angular + TypeScript" badge
- Copyright: "© 2026 Tushar Sahu"

**Navigation:**
- Sticky header with smooth-scroll anchor links
- Links: Home, Skills, Experience, Projects, Education
- Mobile: Hamburger menu (collapsible)
- "Back to Top" button (appears after scrolling 500px)

---

### 2. Cover Letter Pages (`CoverLetterComponent`)

**Three separate templates, same component with different data:**

#### Software Engineer Role
- **Emphasis:** Angular expertise, frontend leadership, technical depth
- **Highlights:** 12+ years experience, NICE/Oracle projects, modern frameworks
- **Tone:** Technical, detail-oriented
- **Content:** 3-4 paragraphs focusing on technical skills, specific projects, and problem-solving

#### Lead Developer Role
- **Emphasis:** Team leadership, mentoring, project delivery, collaboration
- **Highlights:** Leading UI teams, working with Product Owners, guiding junior developers
- **Tone:** Leadership-focused, strategic
- **Content:** 3-4 paragraphs on leadership experience, team management, and delivery

#### Startup Position
- **Emphasis:** Full-stack capabilities, versatility, fast execution
- **Highlights:** Angular + Node.js + MongoDB stack, end-to-end delivery, adaptability
- **Tone:** Entrepreneurial, adaptable, versatile
- **Content:** 3-4 paragraphs showcasing versatility and ability to wear multiple hats

#### Page Design (All Templates)
- Professional business letter format
- Header: Name, contact info (right-aligned)
- Greeting: "Dear Hiring Manager," (or similar)
- Body: 3-4 well-spaced paragraphs
- Closing: "Sincerely," + Name
- Footer: "Generated from tusharsahu.github.io/resume"
- Actions:
  - "Download as PDF" button (top-right, primary)
  - "View Another Template" dropdown
  - "Back to Resume" link (top-left)

---

### 3. GitHub Integration (`GithubService`)

**Purpose:** Fetch live repository stats for featured projects

#### Service Implementation
```typescript
@Injectable({ providedIn: 'root' })
export class GithubService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_DURATION = 3600000; // 1 hour

  getRepoStats(owner: string, repo: string): Observable<GithubStats> {
    const cacheKey = `${owner}/${repo}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return of(cached.data);
    }

    return this.http.get<GithubStats>(`https://api.github.com/repos/${owner}/${repo}`)
      .pipe(
        tap(data => this.cache.set(cacheKey, { data, timestamp: Date.now() })),
        catchError(() => of(null)) // Graceful fallback
      );
  }
}
```

#### Rate Limiting
- GitHub API: 60 requests/hour (unauthenticated)
- Cache responses for 1 hour
- Show static data if API fails or rate-limited
- No breaking errors if GitHub is unavailable

#### Data Fetched
- `stargazers_count` → Display as stars
- `forks_count` → Display as forks
- `language` → Display with color badge
- `updated_at` → Display as "Last updated X days ago"

---

### 4. PDF Generation (`PdfService`)

**Library:** jsPDF + jsPDF-autotable

#### Resume PDF
**Format:**
- Page size: A4
- Margins: 1 inch all sides
- Font: Helvetica (built-in)
- Layout: Traditional resume format

**Sections:**
1. **Header:** Name (large), contact info (email, phone, LinkedIn, GitHub)
2. **Professional Summary:** 3-4 sentence pitch
3. **Skills:** Comma-separated or table format by category
4. **Experience:** Company, role, duration, key achievements (bullets)
5. **Projects:** Name, description, tech stack, links
6. **Education:** Degree, institution, year, percentage

**Features:**
- Clickable links (email, LinkedIn, GitHub URLs)
- Proper spacing between sections
- Bold section headers
- Bullet points for achievements
- Filename: `Tushar_Sahu_Resume.pdf`

#### Cover Letter PDF
**Format:**
- Page size: A4
- Margins: 1 inch all sides
- Font: Helvetica
- Layout: Business letter format

**Structure:**
1. **Header:** Name and contact (right-aligned)
2. **Date:** Current date
3. **Greeting:** "Dear Hiring Manager,"
4. **Body:** Letter content (from template data)
5. **Closing:** "Sincerely," + Name
6. **Footer:** Small text - "Generated from tusharsahu.github.io/resume"

**Filename:** `Tushar_Sahu_CoverLetter_[Type].pdf`  
Example: `Tushar_Sahu_CoverLetter_Software_Engineer.pdf`

#### Implementation
```typescript
@Injectable({ providedIn: 'root' })
export class PdfService {
  generateResumePdf(data: ResumeData): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'a4'
    });

    // Add header, sections, styling
    // Use jsPDF-autotable for structured content
    
    doc.save('Tushar_Sahu_Resume.pdf');
  }

  generateCoverLetterPdf(coverLetter: CoverLetter): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'a4'
    });

    // Add letter content with proper formatting
    
    doc.save(`Tushar_Sahu_CoverLetter_${coverLetter.type}.pdf`);
  }
}
```

---

## Design System

### Color Palette (GitHub-Inspired)
- **Primary Blue:** `#0969da` (GitHub blue - buttons, links)
- **Dark Text:** `#24292f` (headings, primary text)
- **Light Text:** `#57606a` (secondary text, captions)
- **Background:** `#ffffff` (main background)
- **Card Background:** `#f6f8fa` (subtle gray for cards)
- **Borders:** `#d0d7de` (card borders, dividers)
- **Accent Colors:** `#1f6feb`, `#54aeff` (chart bars, highlights)
- **Success Green:** `#1a7f37` (GitHub green - success states)

### Typography
- **Font Family:**
  - Headings: `'Inter', 'system-ui', -apple-system, sans-serif`
  - Body: `'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
  - Code/Badges: `'SF Mono', 'Consolas', 'Monaco', monospace`

- **Font Sizes:**
  - H1 (Name): `48px` (mobile: `32px`)
  - H2 (Section headers): `32px` (mobile: `24px`)
  - H3 (Subsections): `24px` (mobile: `20px`)
  - Body: `16px`
  - Small/Caption: `14px`

- **Font Weights:**
  - Bold: `700` (headings)
  - Semibold: `600` (subheadings)
  - Regular: `400` (body text)

### Component Styles

#### Cards (GitHub-Style)
- Background: `#ffffff`
- Border: `1px solid #d0d7de`
- Border radius: `8px`
- Padding: `24px`
- Hover: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)`
- Transition: `all 0.3s ease`

#### Buttons
**Primary:**
- Background: `#0969da`
- Text: `#ffffff`
- Padding: `12px 24px`
- Border radius: `6px`
- Hover: Darken background to `#0860ca`

**Secondary:**
- Background: `#f6f8fa`
- Text: `#24292f`
- Border: `1px solid #d0d7de`
- Hover: Background to `#e8ecef`

#### Badges (Tech Stack)
- Background: `#ddf4ff` (light blue)
- Text: `#0969da`
- Padding: `4px 12px`
- Border radius: `12px` (pill shape)
- Font size: `14px`
- Font weight: `500`

#### Skill Bars (Dashboard Element)
- Container: Gray background `#e5e7eb`, height `24px`, rounded
- Bar: Blue gradient `#0969da` to `#1f6feb`, animated fill
- Animation: 1-second ease-in-out on scroll into view
- Text: Percentage displayed on the right

#### Timeline (Experience)
- Vertical line: `2px solid #d0d7de`
- Nodes: Circular `24px`, background `#0969da`, border `4px solid #ffffff`
- Cards connected to nodes with horizontal lines

### Responsive Breakpoints
- **Mobile:** `< 640px` (single column, stacked layout)
- **Tablet:** `640px - 1024px` (2-column grids where applicable)
- **Desktop:** `> 1024px` (3-column grids, full layout)

### Animations
- **Smooth Scroll:** `scroll-behavior: smooth` for anchor navigation
- **Fade In:** Sections fade in on scroll using Intersection Observer
- **Skill Bars:** Animate from 0 to target percentage on scroll into view
- **Hover Effects:** Subtle scale and shadow on cards/buttons
- **Page Transitions:** Fade in/out between routes (200ms)

---

## Deployment

### Hosting: GitHub Pages

**Repository Setup:**
- Repository name: `tusharsahu.github.io` (user site) or `resume` (project site)
- Branch: `gh-pages` (auto-generated by GitHub Actions)
- URL: `https://tusharsahu.github.io/` or `https://tusharsahu.github.io/resume/`

### Build Configuration

**angular.json updates:**
```json
{
  "projects": {
    "resume": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/resume",
            "baseHref": "/resume/"  // or "/" for user site
          }
        }
      }
    }
  }
}
```

### GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build -- --configuration production
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/resume
```

### Deployment Steps
1. Push code to `main` branch
2. GitHub Actions automatically builds the project
3. Deploys build artifacts to `gh-pages` branch
4. Site goes live at GitHub Pages URL

### Custom Domain (Optional)
- Add `CNAME` file to `src/` directory with custom domain
- Configure DNS to point to GitHub Pages

---

## Error Handling

### GitHub API Failures
- **Scenario:** Rate limit exceeded, network error, repo not found
- **Handling:** Gracefully fall back to static data (show project without stats)
- **User Experience:** No breaking errors, optional stats simply don't display

### PDF Generation Failures
- **Scenario:** Browser compatibility issues, memory constraints
- **Handling:** Show error message, offer alternative (print to PDF)
- **User Experience:** Toast notification with fallback instructions

### Navigation Errors
- **Scenario:** Invalid route, 404
- **Handling:** Redirect to home page (`/`)
- **User Experience:** Seamless redirect, no error page needed

---

## Testing Strategy

### Unit Tests
- **Services:** `GithubService`, `PdfService`, `ScrollService`
- **Components:** Hero section, skill bars, project cards
- **Models:** Data validation for TypeScript interfaces
- **Tools:** Jasmine + Karma

### Manual Testing Checklist
1. ✅ Smooth scroll navigation works on all sections
2. ✅ Skill bars animate correctly on scroll
3. ✅ GitHub API fetches stats for all projects
4. ✅ Resume PDF generates with correct formatting
5. ✅ All 3 cover letter PDFs generate correctly
6. ✅ Responsive design works on mobile, tablet, desktop
7. ✅ All external links (GitHub, LinkedIn) open correctly
8. ✅ Back to top button appears and functions
9. ✅ Sticky navigation works properly
10. ✅ Page loads under 3 seconds

### Browser Compatibility
- **Primary:** Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile:** iOS Safari, Chrome Mobile
- **PDF Generation:** Test across browsers for consistency

---

## Maintenance & Updates

### Updating Resume Data
1. Edit TypeScript files in `src/app/core/data/`
2. Update `resume-data.ts` for personal info, experience
3. Update `skills-data.ts` for new skills or proficiency changes
4. Update `projects-data.ts` for new projects
5. Run `npm run build` and deploy

### Adding New Projects
1. Add entry to `projects-data.ts`
2. Add screenshot to `assets/images/projects/`
3. Provide GitHub repo URL for automatic stats

### Modifying Cover Letters
1. Edit `cover-letters-data.ts`
2. Update paragraphs for each template type
3. Changes immediately reflected on next build

### Version Control
- Use semantic versioning for major updates
- Tag releases in Git: `v1.0.0`, `v1.1.0`, etc.
- Maintain changelog for significant changes

---

## Success Criteria

### Functional Requirements
✅ All resume sections display correctly  
✅ PDF generation works for resume and cover letters  
✅ GitHub API integration displays live stats  
✅ Smooth scroll navigation functions properly  
✅ Responsive design works across devices  
✅ Site deploys successfully to GitHub Pages

### Performance Requirements
✅ Initial page load < 3 seconds  
✅ Time to interactive < 4 seconds  
✅ Lighthouse performance score > 90  
✅ Mobile performance score > 85

### Quality Requirements
✅ No console errors in production  
✅ All links functional and tested  
✅ Professional, polished UI matching GitHub aesthetic  
✅ PDFs formatted professionally and print-ready  
✅ Code follows Angular best practices and style guide

---

## Future Enhancements (Post-MVP)

### Phase 2 (Optional)
- Add dark mode toggle
- Implement advanced animations (GSAP, Framer Motion)
- Add resume analytics (view counts via backend)
- Integrate more social links (Twitter, Medium, Stack Overflow)
- Add downloadable project case studies

### Phase 3 (If Backend Added Later)
- User authentication for admin panel
- Real-time resume editing
- AI-powered cover letter generation
- Contact form with email notifications
- Blog section for technical articles

---

## Conclusion

This design specification provides a complete blueprint for building a professional, GitHub-style resume website using Angular, TypeScript, and modern web technologies. The platform showcases Tushar Sahu's 12+ years of software engineering experience while demonstrating technical proficiency in frontend development.

**Key Deliverables:**
1. Single-page scrolling resume with GitHub aesthetic
2. Three professional cover letter templates
3. Project showcase with live GitHub integration
4. Professional PDF generation for resume and cover letters
5. Fully responsive design
6. Deployed to GitHub Pages with automated CI/CD

The design prioritizes simplicity, maintainability, and professional presentation while staying within the scope of a static site architecture.
