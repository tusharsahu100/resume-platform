import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'web-studio',
    name: 'Web Studio - NICE Systems',
    description: 'Enterprise web application for customer interaction management built with Angular and AWS',
    longDescription: 'Leading the development of Web Studio, a comprehensive customer interaction management platform. Built with Angular, .NET, and AWS, this application enables businesses to design and manage customer engagement workflows at scale.',
    techStack: ['Angular', '.NET', 'AWS', 'TypeScript', 'Azure DevOps'],
    featured: true,
    imageUrl: 'assets/images/projects/web-studio.png'
  },
  {
    id: 'herald-health',
    name: 'Herald Health Dashboard',
    description: 'Real-time healthcare monitoring dashboard for doctors built with Angular 8, Node.js, and MongoDB',
    longDescription: 'Designed and developed comprehensive healthcare monitoring dashboards that enable doctors to track patient health metrics in real-time. Features include alert systems, patient history visualization, and predictive health indicators.',
    techStack: ['Angular 8', 'Node.js', 'MongoDB', 'Real-time Data', 'Healthcare'],
    featured: true,
    imageUrl: 'assets/images/projects/herald-health.png'
  },
  {
    id: 'obscf-oracle',
    name: 'OBSCF - Financial Platform',
    description: 'Enterprise financial transaction tracking system built with Angular 10 for Oracle',
    longDescription: 'Led UI development for Oracle\'s financial domain application, providing seamless financial transaction tracking and reporting. Implemented responsive, scalable UI components with a focus on data accuracy and real-time updates.',
    techStack: ['Angular 10', 'TypeScript', 'Financial Services', 'Oracle'],
    featured: true,
    imageUrl: 'assets/images/projects/obscf.png'
  },
  {
    id: 'clarabridge',
    name: 'Clarabridge Analytics',
    description: 'Analytics portal with dynamic surveys and interactive data visualization built with AngularJS',
    longDescription: 'Developed an advanced analytics portal featuring dynamic survey generation, interactive charts using D3.js and Highcharts, and comprehensive data visualization capabilities for customer feedback analysis.',
    techStack: ['AngularJS', 'D3.js', 'Highcharts', 'Data Visualization', 'Analytics'],
    featured: false,
    imageUrl: 'assets/images/projects/clarabridge.png'
  }
];
