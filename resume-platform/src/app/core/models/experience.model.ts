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
