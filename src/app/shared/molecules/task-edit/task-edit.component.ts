import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../features/task/task.model';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input() task!: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  editedTask!: Task;

  ngOnInit() {
    this.editedTask = { ...this.task };
  }

  onSubmit() {
    if (this.editedTask.title.trim()) {
      this.save.emit(this.editedTask);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}