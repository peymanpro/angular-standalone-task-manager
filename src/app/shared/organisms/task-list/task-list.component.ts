import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../features/task/task.service';
import { ButtonComponent } from '../../atoms/button/button.component';
import { Task } from '../../../features/task/task.model';

import { TaskEditComponent } from '../../molecules/task-edit/task-edit.component'; // ایمپورت جدید
import { TaskItemComponent } from '../../molecules/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, ButtonComponent, TaskEditComponent], // اضافه شد
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';
  editingTask: Task | null = null; // متغیر جدید

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
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
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }

  // متد جدید برای باز کردن مودال
  onEdit(task: Task) {
    this.editingTask = task;
  }

  // بستن مودال
  closeEdit() {
    this.editingTask = null;
  }

  // ذخیره ویرایش
  saveEdit(updatedTask: Task) {
    this.taskService.updateTask(updatedTask.id, updatedTask);
    this.editingTask = null;
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.applyFilter();
  }
}