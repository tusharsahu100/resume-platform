import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';
import { GithubService } from '../../../core/services/github.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent implements OnInit {
  @Input({ required: true }) project!: Project;
  private githubService = inject(GithubService);

  expanded = false;

  ngOnInit(): void {
    if (this.project.githubRepo) {
      const [owner, repo] = this.project.githubRepo.split('/');
      this.githubService.getRepoStats(owner, repo).subscribe(stats => {
        if (stats) {
          this.project.stars = stats.stargazers_count;
          this.project.forks = stats.forks_count;
          this.project.language = stats.language ?? undefined;
          this.project.lastUpdated = this.formatDate(stats.updated_at);
        }
      });
    }
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
}
