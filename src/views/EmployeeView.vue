<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Column from 'primevue/column'
import AppDataTable from '@/components/AppDataTable.vue'
import employeesData from '@/assets/employee.json'

interface Employee {
  id: number
  name: string
  role: string
  department: string
  email: string
}

const employees = ref<Employee[]>([])

onMounted(() => {
  employees.value = employeesData
})
</script>

<template>
  <div class="employee-page glass">
    <div class="page-header">
      <h1 class="primary">Employee Directory</h1>
      <p>Manage and view all company employees in one place.</p>
    </div>

    <AppDataTable
      :value="employees"
      paginator
      :rows="20"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      tableStyle="min-width: 50rem"
    >
      <Column field="id" header="ID" sortable style="width: 10%"></Column>
      <Column field="name" header="Name" sortable style="width: 25%"></Column>
      <Column field="role" header="Role" sortable style="width: 25%"></Column>
      <Column field="department" header="Department" sortable style="width: 20%"></Column>
      <Column field="email" header="Email" sortable style="width: 20%"></Column>
    </AppDataTable>
  </div>
</template>

<style scoped>
.employee-page {
  padding: 1rem;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  margin-bottom: 0.5rem;
  flex-shrink: 0;
}

.page-header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.page-header p {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.85rem;
}
</style>
