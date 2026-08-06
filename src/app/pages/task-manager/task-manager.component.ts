import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../shared/molecules/task-form/task-form.component';
import { TaskListComponent } from '../../shared/organisms/task-list/task-list.component';
import { TaskService } from '../../features/task/task.service';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  constructor(private taskService: TaskService) {}

  onTaskAdded(event: any) {
    this.taskService.addTask(
      event.title,
      event.description,
      event.priority,
      event.dueDate
    );
  }
}