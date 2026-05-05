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
