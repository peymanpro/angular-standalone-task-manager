import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  getAllTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(
    title: string,
    description: string = '',
    priority: Task['priority'] = 'medium',
    dueDate?: string,
  ): void {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date(),
    };

    const current = this.tasksSubject.getValue();
    this.tasksSubject.next([newTask, ...current]);
    this.saveToLocalStorage();
  }

  toggleComplete(id: string): void {
    const tasks = this.tasksSubject.getValue();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next([...tasks]);
      this.saveToLocalStorage();
    }
  }

  deleteTask(id: string): void {
    const tasks = this.tasksSubject.getValue();
    const filtered = tasks.filter((t) => t.id !== id);
    this.tasksSubject.next(filtered);
    this.saveToLocalStorage();
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const tasks = this.tasksSubject.getValue();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      Object.assign(task, updates);
      this.tasksSubject.next([...tasks]);
      this.saveToLocalStorage();
    }
  }

  private loadFromLocalStorage(): void {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      const tasks = JSON.parse(saved);

      tasks.forEach((t: any) => (t.createdAt = new Date(t.createdAt)));
      this.tasksSubject.next(tasks);
    }
  }

  private saveToLocalStorage(): void {
    const tasks = this.tasksSubject.getValue().map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
