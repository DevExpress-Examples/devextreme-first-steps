import { useCallback, useState } from 'react';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import ProgressBar from 'devextreme-react/progress-bar';
import './App.css';
import 'devextreme/dist/css/dx.light.css';

const tasks = [
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
        dataSource={tasks}
        onRowUpdated={updateProgress}
        onRowInserted={updateProgress}
        onRowRemoved={updateProgress}
      >
        <Column dataField='task' />
        <Column dataField='dueDate' />
        <Column dataField='done' />{' '}
        <Editing
          mode='row'
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          newRowPosition='last'
        />
      </DataGrid>
    </div>
  );
}

export default App;
