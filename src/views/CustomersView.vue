<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { FilterMatchMode } from '@primevue/core/api'
import AppDataTable from '@/components/AppDataTable.vue'
import customersData from '@/assets/customers.json'

interface Customer {
  id: number
  name: string
  company: string
  status: string
  email: string
}

const customers = ref<Customer[]>([])
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  company: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

onMounted(() => {
  customers.value = customersData
})
</script>

<template>
  <div class="customers-page glass">
    <div class="page-header">
      <h1 class="primary">Customers Directory</h1>
      <p>Manage and view all your key customer relationships.</p>
    </div>

    <AppDataTable
      :value="customers"
      paginator
      :rows="20"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      :filters="filters"
      tableStyle="min-width: 50rem"
    >
      <Column field="id" header="ID" sortable style="width: 10%"></Column>
      <Column field="name" header="Name" sortable style="width: 25%">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search name"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="company" header="Company" sortable style="width: 25%">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search company"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="status" header="Status" sortable style="width: 20%">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search status"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column field="email" header="Email" sortable style="width: 20%">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Search email"
            class="p-column-filter"
          />
        </template>
      </Column>
    </AppDataTable>
  </div>
</template>

<style scoped>
.customers-page {
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
