import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../features/task/task.service';
import { ButtonComponent } from '../../atoms/button/button.component';
import { Task } from '../../../features/task/task.model';
import { TaskItemComponent } from '../../molecules/task-item/task-item.component';
import { TaskEditComponent } from '../../molecules/task-edit/task-edit.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, ButtonComponent, TaskEditComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'active'; 
  editingTask: Task | null = null;
  editMode: 'edit' | 'add' = 'edit';

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

  onEdit(task: Task) {
    this.editMode = 'edit';
    this.editingTask = task;
  }

  openAddModal() {
    this.editMode = 'add';
    this.editingTask = {} as Task; 
  }

  closeEdit() {
    this.editingTask = null;
  }

  saveEdit(updatedTask: Task) {
    if (this.editMode === 'add') {
      this.taskService.addTask(
        updatedTask.title,
        updatedTask.description,
        updatedTask.priority,
        updatedTask.dueDate
      );
    } else {
      this.taskService.updateTask(updatedTask.id, updatedTask);
    }
    this.editingTask = null;
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
    this.applyFilter();
  }
}