import { Experience } from '../models/experience.model';

export const EXPERIENCES: Experience[] = [
  {
    id: 'nice-systems',
    company: 'NICE Systems',
    role: 'Specialist Software Engineer / Team Lead',
    location: 'Pune, India',
    duration: 'Jun 2023 – Present',
    startDate: new Date('2023-06-01'),
    description: [
      'Leading 5-6 developers on the Web Studio project using Angular Framework, .NET, and AWS cloud infrastructure for CXone enterprise platform serving Financial and Telecom domains.',
      'Driving feature delivery and sprint execution with consistent 20% velocity improvement through AI-assisted development practices, modern tooling adoption, and process optimization.',
      'Mentoring team members on Angular best practices, .NET backend development, and AWS cloud architecture – conducting code reviews, pair programming sessions, and technical upskilling workshops.',
      'Collaborating with Product Owner to gather requirements, define technical solutions, and align sprint deliverables with business goals while ensuring architectural consistency.',
      'Delivering 50+ major features including dynamic workflow builders, real-time dashboards, and scalable microservices while maintaining high code quality and test coverage standards.'
    ],
    technologies: ['Angular', '.NET', 'AWS', 'TypeScript', 'Team Leadership', 'AI-Assisted Development'],
    achievements: [
      'Led team of 5-6 developers delivering 50+ major features for CXone Web Studio platform',
      'Improved sprint velocity by 20% through AI-assisted development practices and team enablement',
      'Mentored engineers on Angular, .NET, and AWS, conducting regular code reviews and upskilling sessions',
      'Collaborated with Product Owner to define technical solutions and align deliverables with business goals'
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
