import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskService } from '../../../features/task/task.service';

import { ButtonComponent } from '../../atoms/button/button.component';
import { Task } from '../../../features/task/task.model';
import { TaskItemComponent } from '../../molecules/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, ButtonComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getAllTasks();
    this.applyFilter();
  }

  applyFilter() {
    if (this.filter === 'active') {
      this.filteredTasks = this.tasks.filter(t => !t.completed);
    } else if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(t => t.completed);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  onToggle(id: string) {
    this.taskService.toggleComplete(id);
    this.loadTasks();
  }

  onDelete(id: string) {
    if (confirm('آیا از حذف این تسک مطمئن هستید؟')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  onEdit(task: Task) {
    // فعلاً ساده پیاده‌سازی می‌شود (در مراحل بعدی کامل می‌شود)
    const newTitle = prompt('عنوان جدید:', task.title);
    if (newTitle && newTitle.trim()) {
      this.taskService.updateTask(task.id, { title: newTitle.trim() });
      this.loadTasks();
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.applyFilter();
  }
}