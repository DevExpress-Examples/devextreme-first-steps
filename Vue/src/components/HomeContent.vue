<template>
  <div id="dashboard">
    <DxProgressBar
      id="progress"
      :value="progressValue"
    />
    <DxDataGrid
      id="task-grid"
      key-expr="id"
      :data-source="tasks"
      @row-updated="updateProgress"
      @row-inserted="updateProgress"
      @row-removed="updateProgress"
    >
      <DxColumn
        data-field="task"
        cell-template="taskCellTemplate"
      />
      <template #taskCellTemplate="{ data }">
        <div v-if="!data.value">
          <div style="color: var(--dx-color-icon)">Enter a title...</div>
        </div>
        <div v-else>
          <div>{{ data.value }}</div>
        </div>
      </template>
      <DxColumn
        data-field="dueDate"
        cell-template="dueDateCellTemplate"
      />
      <template #dueDateCellTemplate="{ data }">
        <div v-if="!data.value">
          <div style="color: var(--dx-color-icon)">Enter a date...</div>
        </div>
        <div v-else>
          <div>{{ formatDate(data.value, 'shortDate') }}</div>
        </div>
      </template>
      <DxColumn
        data-field="done"
        :calculate-cell-value="calculateDoneValue"
      />
      <DxColumn
        type="buttons"
        header-cell-template="buttonColumnHeaderTemplate"
      />
      <template #buttonColumnHeaderTemplate="{ data }">
        <DxButton
          icon="add"
          styling-mode="text"
          @click="createAddClickHandler(data.component)"
        />
      </template>
      <DxEditing
        mode="cell"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        new-row-position="last"
      />
    </DxDataGrid>
  </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';

import { DxProgressBar } from 'devextreme-vue/progress-bar';
import { DxDataGrid, DxColumn, DxEditing } from 'devextreme-vue/data-grid';
import { DxButton } from 'devextreme-vue/button';

import { formatDate } from 'devextreme/localization';
import notify from 'devextreme/ui/notify';

import 'devextreme/dist/css/dx.fluent.blue.light.css';
import dxDataGrid from 'devextreme/ui/data_grid';

interface taskData {
  id: number;
  task: string;
  dueDate: Date;
  done: boolean;
}

const tasks: taskData[] = [
  { id: 1, task: 'Buy groceries', dueDate: new Date(), done: false },
  { id: 2, task: 'Write a blog post', dueDate: new Date(), done: true },
];

const progressValue = ref(50);

function updateProgress() {
  const all = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  progressValue.value = Math.round((completed / all) * 100);
}

function createAddClickHandler(grid: dxDataGrid): () => void {
  return () => {
    grid.addRow().catch((error) => {
      // addRow() returns a promise. This code satisfies the no-floating-promises lint rule.
      notify(error);
    });
  };
}

// This processes `undefined` values to eliminate the Indeterminate state in CheckBox components.
function calculateDoneValue(row: taskData): boolean {
  return !!row.done;
}
</script>
<style>
:root {
  color-scheme: light; /* Update this property when you switch between light/dark themes. */
}

#dashboard {
  display: grid;
  gap: 20px;
  max-width: 900px;
  margin: 40px auto;
  padding: 80px 20px;
  box-sizing: border-box;
}

#progress, #task-grid {
  background-color: light-dark(#fff, #383838);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

#progress {
  padding-top: 32px
}

#task-grid .dx-datagrid-headers, #task-grid .dx-datagrid .dx-datagrid-table .dx-header-row>td:first-child {
  border-top-left-radius: 8px;
}

#task-grid .dx-datagrid-headers, #task-grid .dx-datagrid .dx-datagrid-table .dx-header-row>td:last-child {
  border-top-right-radius: 8px;
}

#task-grid .dx-datagrid-header-panel {
  display: none;
}

#task-grid .dx-row-lines:nth-last-child(2) > td {
  border-bottom-style: none;
}

#task-grid .dx-datagrid-rowsview {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-style: none;
}

.dx-dialog .dx-toolbar-center {
  margin: -8px !important;
  width: calc(100% + 16px);
  border-spacing: 8px 0;
  float: none !important;
}

.dx-toolbar-center .dx-button {
  width: 100%;
}

.dx-toolbar-center .dx-item {
  padding-right: 0 !important;
}

.dx-link-delete::before {
  color: var(--dx-color-danger)
}
</style>
