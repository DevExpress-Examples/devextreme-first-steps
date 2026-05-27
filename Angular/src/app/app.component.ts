import { Component } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxProgressBarModule } from 'devextreme-angular/ui/progress-bar';
import { DxButtonModule, type DxButtonTypes } from 'devextreme-angular/ui/button';
import { formatDate } from 'devextreme/localization';
import type dxDataGrid from 'devextreme/ui/data_grid';
import notify from 'devextreme/ui/notify';

interface taskData {
  id: number;
  task: string;
  dueDate: Date;
  done: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DxDataGridModule, DxProgressBarModule, DxButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  formatDate = formatDate;

  tasks: taskData[] = [
    {
      id: 1,
      task: 'Buy groceries',
      dueDate: new Date(),
      done: false,
    },
    {
      id: 2,
      task: 'Write a blog post',
      dueDate: new Date(),
      done: true,
    },
  ];

  progressValue = 50;

  // This processes `undefined` values to eliminate the Indeterminate state in CheckBox components.
  calculateDoneValue(row: taskData): boolean {
    return !!row.done;
  }

  createAddClickHandler(grid: dxDataGrid): (e: DxButtonTypes.ClickEvent) => void {
    return () => {
      grid.addRow().catch((error) => {
        // addRow() returns a promise. This code satisfies the no-floating-promises lint rule.
        notify(error);
      });
    };
  }

  updateProgress(): void {
    const all = this.tasks.length;
    const completed = this.tasks.filter((t) => t.done).length;
    this.progressValue = Math.round((completed / all) * 100);
  }
}
