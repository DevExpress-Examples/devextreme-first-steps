import { useCallback, useState } from 'react';

import {
  DataGrid,
  Column,
  Editing,
  Toolbar,
  type DataGridTypes,
} from 'devextreme-react/data-grid';
import { ProgressBar } from 'devextreme-react/progress-bar';
import { Button } from 'devextreme-react/button';

import type dxDataGrid from 'devextreme/ui/data_grid';
import { formatDate } from 'devextreme/localization';
import notify from 'devextreme/ui/notify';

import './App.css';
import 'devextreme/dist/css/dx.fluent.blue.light.css';

interface TaskData {
  id: number;
  task: string;
  dueDate: Date;
  done: boolean;
}

const tasks: TaskData[] = [
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

function createAddClickHandler(grid: dxDataGrid): () => void {
  return () => {
    grid.addRow().catch((error) => {
      // addRow() returns a promise. This code satisfies the no-floating-promises lint rule.
      notify(error);
    });
  };
}

function renderTaskCell(data: DataGridTypes.ColumnCellTemplateData): JSX.Element {
  if (!data.value) {
    return (
      <div style={{ color: 'var(--dx-color-icon)' }}>Enter a title...</div>
    );
  }
  return (
    <div>{data.value}</div>
  );
}

function renderDueDateCell(data: DataGridTypes.ColumnCellTemplateData): JSX.Element {
  if (!data.value) {
    return (
      <div style={{ color: 'var(--dx-color-icon)' }}>Enter a date...</div>
    );
  }
  return (
    <div>{formatDate(data.value, 'shortDate')}</div>
  );
}

// This processes `undefined` values to eliminate the Indeterminate state in CheckBox components.
function calculateDoneValue(row: TaskData): boolean {
  return !!row.done;
}

function renderButtonColumnHeader(data: DataGridTypes.ColumnHeaderCellTemplateData): JSX.Element {
  return (
    <Button
      icon='add'
      stylingMode='text'
      onClick={createAddClickHandler(data.component)}
    />
  );
}

function App(): JSX.Element {
  const [progressValue, setProgressValue] = useState(50);

  const updateProgress = useCallback(() => {
    const all = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    setProgressValue(Math.round((completed / all) * 100));
  }, [tasks]);

  return (
    <div id='dashboard'>
      <ProgressBar id='progress' value={progressValue} />
      <DataGrid
        id='task-grid'
        keyExpr='id'
        dataSource={tasks}
        onRowUpdated={updateProgress}
        onRowInserted={updateProgress}
        onRowRemoved={updateProgress}
      >
        <Column
          dataField='task'
          cellRender={renderTaskCell}
        />
        <Column
          dataField='dueDate'
          cellRender={renderDueDateCell}
        />
        <Column
          dataField='done'
          calculateCellValue={calculateDoneValue}
        />
        <Column
          type='buttons'
          headerCellRender={renderButtonColumnHeader}
        />
        <Editing
          mode='cell'
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          newRowPosition='last'
        />
        <Toolbar
          visible={false}
        />
      </DataGrid>
    </div>
  );
}

export default App;
