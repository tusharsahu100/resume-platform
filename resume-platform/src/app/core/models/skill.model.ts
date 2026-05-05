export type SkillCategory = 'Frontend' | 'Backend' | 'Tools' | 'Leadership' | 'Other';

export interface Skill {
  category: SkillCategory;
  name: string;
  proficiency: number;  // 0-100
  yearsOfExperience?: number;
}
