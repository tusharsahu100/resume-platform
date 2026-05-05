import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../core/models/experience.model';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-item.component.html'
})
export class TimelineItemComponent {
  @Input({ required: true }) experience!: Experience;
  @Input() isLast = false;

  expanded = false;

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
}
