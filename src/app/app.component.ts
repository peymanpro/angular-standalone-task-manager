import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './shared/molecules/task-form/task-form.component';
import { TaskListComponent } from './shared/organisms/task-list/task-list.component';
import { TaskService } from './features/task/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-standalone-task-manager';

  constructor(private taskService: TaskService) {}

  onTaskAdded(event: any) {
    this.taskService.addTask(
      event.title,
      event.description,
      event.priority,
      event.dueDate
    );
    
    // لیست را رفرش می‌کنیم (از طریق EventEmitter بهتر است اما برای سادگی)
    window.location.reload(); // موقتاً — در نسخه بعدی بهتر می‌کنیم
  }
}