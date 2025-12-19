<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import employeesData from '@/assets/employee.json'

interface Employee {
  id: number
  name: string
  role: string
  department: string
  email: string
}

const employees = ref<Employee[]>([])
const gridHeight = ref('500px')
const containerRef = ref<HTMLElement | null>(null)

const calculateHeight = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    const pageHeader = containerRef.value.querySelector('.page-header') as HTMLElement

    const pageHeaderHeight = pageHeader ? pageHeader.offsetHeight : 0
    const verticalPadding = 80 // Increased buffer for bottom spacing

    const calculated = window.innerHeight - rect.top - pageHeaderHeight - verticalPadding
    gridHeight.value = `${Math.max(300, calculated)}px`
  }
}

onMounted(async () => {
  employees.value = employeesData
  await nextTick()
  calculateHeight()
  setTimeout(calculateHeight, 100)
  window.addEventListener('resize', calculateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeight)
})
</script>

<template>
  <div class="employee-page glass" ref="containerRef">
    <div class="page-header">
      <h1 class="primary">Employee Directory</h1>
      <p>Manage and view all company employees in one place.</p>
    </div>

    <div class="grid-container" :style="{ height: gridHeight }">
      <DataTable
        :value="employees"
        scrollable
        scrollHeight="flex"
        paginator
        :rows="20"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        tableStyle="min-width: 50rem"
        class="p-datatable-sm sticky-header-table"
      >
        <Column field="id" header="ID" sortable style="width: 10%"></Column>
        <Column field="name" header="Name" sortable style="width: 25%"></Column>
        <Column field="role" header="Role" sortable style="width: 25%"></Column>
        <Column field="department" header="Department" sortable style="width: 20%"></Column>
        <Column field="email" header="Email" sortable style="width: 20%"></Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.employee-page {
  padding: 1rem;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent container itself from scrolling */
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

.grid-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Customizing PrimeVue DataTable to match our theme */
:deep(.p-datatable) {
  background: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.p-datatable-wrapper) {
  flex: 1;
}

/* Sticky Header specific styles */
:deep(.p-datatable-thead) {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--glass-bg) !important;
  backdrop-filter: blur(8px);
}

:deep(.p-datatable-header),
:deep(.p-datatable-thead > tr > th),
:deep(.p-datatable-tbody > tr),
:deep(.p-datatable-tfoot > tr > td),
:deep(.p-paginator) {
  background: transparent !important;
  color: var(--color-text);
  border-color: var(--color-border);
}

:deep(.p-datatable-thead > tr > th) {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 1rem;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: var(--color-background-soft) !important;
}

:deep(.p-paginator) {
  padding: 0.5rem;
  border-top: 1px solid var(--color-border);
}

:deep(.p-paginator .p-paginator-page.p-highlight) {
  background: var(--primary);
  color: white;
}
</style>
