import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<{
    title: string;
    description: string;
    priority: Task['priority'];
    dueDate?: string;
  }>();

  title = '';
  description = '';
  priority: Task['priority'] = 'medium';
  dueDate = '';

  onSubmit() {
    if (this.title.trim()) {
      this.taskAdded.emit({
        title: this.title.trim(),
        description: this.description.trim(),
        priority: this.priority,
        dueDate: this.dueDate || undefined
      });

      // Reset form
      this.title = '';
      this.description = '';
      this.priority = 'medium';
      this.dueDate = '';
    }
  }
}