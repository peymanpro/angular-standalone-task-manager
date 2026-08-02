import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://dummyjson.com/todos';
  private localTasks: Task[] = [];

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  // دریافت تسک‌ها از API + محلی
  getTasks(): Observable<Task[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      // در صورت نیاز می‌توانیم ترکیب کنیم با localTasks
    );
  }

  // برای سادگی فعلاً از LocalStorage + Dummy Data استفاده می‌کنیم
  getAllTasks(): Task[] {
    return [...this.localTasks].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  addTask(title: string, description: string = '', priority: Task['priority'] = 'medium', dueDate?: string): Task {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date()
    };

    this.localTasks.push(newTask);
    this.saveToLocalStorage();
    return newTask;
  }

  toggleComplete(id: string): void {
    const task = this.localTasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
    }
  }

  deleteTask(id: string): void {
    this.localTasks = this.localTasks.filter(t => t.id !== id);
    this.saveToLocalStorage();
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const task = this.localTasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
      this.saveToLocalStorage();
    }
  }

  private loadFromLocalStorage(): void {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.localTasks = JSON.parse(saved);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.localTasks));
  }
}