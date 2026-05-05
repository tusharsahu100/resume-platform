import { Experience } from '../models/experience.model';

export const EXPERIENCES: Experience[] = [
  {
    id: 'nice-systems',
    company: 'NICE Systems',
    role: 'Specialist Software Engineer',
    location: 'Pune, India',
    duration: 'Jun 2023 – Present',
    startDate: new Date('2023-06-01'),
    description: [
      'Leading the Web Studio project with technologies Angular, .NET, AWS.',
      'Responsible for team leadership – mentoring, guiding, and assigning tasks to ensure smooth delivery.',
      'Collaborating with the Product Owner to gather requirements and align deliverables with business goals.',
      'Actively contributing in design and development of core features while maintaining best practices and coding standards.',
      'Driving improvements in application scalability, performance, and cloud deployment.'
    ],
    technologies: ['Angular', '.NET', 'AWS', 'TypeScript', 'Team Leadership'],
    achievements: [
      'Led UI team delivering critical Web Studio features',
      'Improved application scalability and AWS deployment practices'
    ]
  },
  {
    id: 'oracle',
    company: 'Oracle',
    role: 'Software Engineer',
    location: 'Pune, India',
    duration: 'Jun 2020 – Jun 2023',
    startDate: new Date('2020-06-01'),
    endDate: new Date('2023-06-01'),
    description: [
      'Lead UI team for OBSCF (Financial Domain) application built in Angular 10.',
      'Designed and developed responsive, scalable UI components ensuring seamless financial transaction tracking.',
      'Mentored junior developers and implemented coding standards (ESLint/JSLint).'
    ],
    technologies: ['Angular 10', 'TypeScript', 'Financial Systems', 'ESLint'],
    achievements: [
      'Led UI team for enterprise financial application',
      'Established coding standards and mentored junior developers'
    ]
  },
  {
    id: 'persistent',
    company: 'Persistent Systems',
    role: 'Lead Project Engineer',
    location: 'Pune, India',
    duration: 'Jan 2018 – Jun 2020',
    startDate: new Date('2018-01-01'),
    endDate: new Date('2020-06-01'),
    description: [
      'Lead UI team for Herald Health (Healthcare) using Angular 8, Node.js, MongoDB.',
      'Designed dashboards for doctors to monitor patients\' health, improving real-time alerts and decision-making.',
      'Contributed to Selligent (Marketing Platform), developing dynamic campaign workflows in Angular 5.'
    ],
    technologies: ['Angular 8', 'Angular 5', 'Node.js', 'MongoDB', 'Healthcare Systems'],
    achievements: [
      'Built real-time healthcare monitoring dashboards',
      'Developed dynamic marketing campaign workflows'
    ]
  },
  {
    id: 'xpanxion',
    company: 'Xpanxion Pvt. Ltd.',
    role: 'UI Developer',
    location: 'Pune, India',
    duration: 'Aug 2016 – Jan 2018',
    startDate: new Date('2016-08-01'),
    endDate: new Date('2018-01-01'),
    description: [
      'Delivered multiple client-facing applications in AngularJS & Angular 2.',
      'Partnered with US clients for Look Listen (Marketing UI) and ParTech (Hospitality domain), improving UX and performance.'
    ],
    technologies: ['AngularJS', 'Angular 2', 'JavaScript', 'Client Collaboration'],
    achievements: [
      'Delivered multiple client projects for US-based clients',
      'Improved UX and performance for marketing and hospitality applications'
    ]
  },
  {
    id: 'cybage',
    company: 'Cybage Software Pvt. Ltd.',
    role: 'Software Engineer',
    location: 'Pune, India',
    duration: 'Dec 2013 – Aug 2016',
    startDate: new Date('2013-12-01'),
    endDate: new Date('2016-08-01'),
    description: [
      'Developed Clarabridge (US client) in AngularJS – an analytics portal with dynamic surveys & interactive data visualization.',
      'Built HTML Video Ad Player (Dimestore – GFK Account) for Media domain, enabling dynamic ad-serving and user data capture.'
    ],
    technologies: ['AngularJS', 'Data Visualization', 'HTML5 Video', 'Analytics'],
    achievements: [
      'Built interactive analytics portal with data visualization',
      'Developed HTML5 video ad player for media domain'
    ]
  }
];
