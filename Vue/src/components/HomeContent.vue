<template>
  <div id='dashboard'>
    <DxProgressBar id='progress' :value='progressValue' />
    <DxDataGrid
      id='task-grid'
      key-expr='id'
      :data-source='tasks'
      @row-updated='updateProgress'
      @row-inserted='updateProgress'
      @row-removed='updateProgress'
    >
      <DxColumn data-field='task' />
      <DxColumn data-field='dueDate' />
      <DxColumn data-field='done' />
      <DxEditing
        mode='cell'
        :allow-updating='true'
        :allow-adding='true'
        :allow-deleting='true'
        new-row-position='last'
      />
    </DxDataGrid>
  </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import DxProgressBar from 'devextreme-vue/progress-bar';
import DxDataGrid, { DxColumn, DxEditing } from 'devextreme-vue/data-grid';
import 'devextreme/dist/css/dx.light.css';

const tasks = [
  { id: 1, task: 'Buy groceries', dueDate: new Date(), done: false },
  { id: 2, task: 'Write a blog post', dueDate: new Date(), done: true },
];
const progressValue = ref(50);
function updateProgress() {
  const all = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  progressValue.value = Math.round((completed / all) * 100);
}
</script>
<style>
#dashboard {
  display: grid;
  gap: 20px;
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  box-sizing: border-box;
}

#progress,
#task-grid {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0 0 0 / 10%);
}
</style>
