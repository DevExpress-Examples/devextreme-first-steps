$(() => {
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

  $('#task-grid').dxDataGrid({
    dataSource: tasks,
    columns: ['task', 'dueDate', 'done'],
    editing: {
      mode: 'cell',
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
      newRowPosition: 'last'
    },
    onRowUpdated: updateProgress,
    onRowInserted: updateProgress,
    onRowRemoved: updateProgress,
  });

  const progress = $('#progress').dxProgressBar({
    value: 50,
  }).dxProgressBar('instance');

  function updateProgress() {
    const all = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    progress.option('value', Math.round((completed / all) * 100));
  }
});
