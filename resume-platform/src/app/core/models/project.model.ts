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

export interface GithubRepoStats {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}
