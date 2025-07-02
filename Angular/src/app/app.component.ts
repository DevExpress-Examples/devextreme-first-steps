import { Component } from '@angular/core';
import { DxDataGridComponent, DxiDataGridColumnComponent, DxoDataGridEditingComponent } from 'devextreme-angular/ui/data-grid';
import { DxProgressBarComponent } from 'devextreme-angular/ui/progress-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DxDataGridComponent, DxProgressBarComponent, DxiDataGridColumnComponent, DxoDataGridEditingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks = [
    { id: 1, task: "Buy groceries", dueDate: new Date(), done: false },
    { id: 2, task: "Write a blog post", dueDate: new Date(), done: true }
  ];
  progressValue = 50;
  updateProgress() {
    const all = this.tasks.length;
    const completed = this.tasks.filter((t) => t.done).length;
    this.progressValue = Math.round((completed / all) * 100);
  };
}

