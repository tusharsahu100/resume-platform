import { Skill } from '../models/skill.model';

export const SKILLS: Skill[] = [
  // Frontend
  { category: 'Frontend', name: 'Angular Framework', proficiency: 95, yearsOfExperience: 10 },
  { category: 'Frontend', name: 'JavaScript (ES6+)', proficiency: 90, yearsOfExperience: 12 },
  { category: 'Frontend', name: 'TypeScript', proficiency: 90, yearsOfExperience: 8 },
  { category: 'Frontend', name: 'HTML5', proficiency: 95, yearsOfExperience: 12 },
  { category: 'Frontend', name: 'CSS3', proficiency: 90, yearsOfExperience: 12 },
  { category: 'Frontend', name: 'Bootstrap', proficiency: 85, yearsOfExperience: 10 },
  { category: 'Frontend', name: 'jQuery', proficiency: 80, yearsOfExperience: 10 },
  { category: 'Frontend', name: 'Responsive Web Design', proficiency: 90, yearsOfExperience: 10 },

  // Backend & DB
  { category: 'Backend', name: 'Node.js', proficiency: 80, yearsOfExperience: 6 },
  { category: 'Backend', name: 'Express.js', proficiency: 75, yearsOfExperience: 5 },
  { category: 'Backend', name: 'MongoDB', proficiency: 75, yearsOfExperience: 5 },

  // Leadership & Management
  { category: 'Leadership', name: 'Team Leadership & Management', proficiency: 90, yearsOfExperience: 6 },
  { category: 'Leadership', name: 'Mentoring & Coaching', proficiency: 85, yearsOfExperience: 6 },
  { category: 'Leadership', name: 'Agile/Scrum Leadership', proficiency: 85, yearsOfExperience: 8 },
  { category: 'Leadership', name: 'AI-Assisted Development Practices', proficiency: 80, yearsOfExperience: 2 },
  { category: 'Leadership', name: 'Cross-functional Collaboration', proficiency: 85, yearsOfExperience: 6 },

  // Tools
  { category: 'Tools', name: 'Git', proficiency: 85, yearsOfExperience: 12 },
  { category: 'Tools', name: 'WebStorm', proficiency: 85, yearsOfExperience: 8 },
  { category: 'Tools', name: 'VS Code', proficiency: 85, yearsOfExperience: 6 },
  { category: 'Tools', name: 'Jasmine', proficiency: 75, yearsOfExperience: 8 },
  { category: 'Tools', name: 'Karma', proficiency: 75, yearsOfExperience: 8 },

  // Libraries
  { category: 'Other', name: 'Highcharts', proficiency: 70, yearsOfExperience: 5 },
  { category: 'Other', name: 'D3.js', proficiency: 65, yearsOfExperience: 4 },
  { category: 'Other', name: 'Kendo UI', proficiency: 70, yearsOfExperience: 3 },
];
