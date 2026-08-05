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
    // عضویت در جریان داده‌های سرویس
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

  onEdit(task: Task) {
    // فعلاً همان prompt است، در فاز ۲ عوض می‌شود
    const newTitle = prompt('New title:', task.title);
    if (newTitle && newTitle.trim()) {
      this.taskService.updateTask(task.id, { title: newTitle.trim() });
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.applyFilter();
  }
}