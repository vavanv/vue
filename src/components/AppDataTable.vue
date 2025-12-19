<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import DataTable from 'primevue/datatable'

defineProps<{
  value: Array<Record<string, unknown>>
  paginator?: boolean
  rows?: number
  rowsPerPageOptions?: number[]
}>()

const gridHeight = ref('500px')
const containerRef = ref<HTMLElement | null>(null)

const calculateHeight = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    // We want a comfortable gap at the bottom of the screen
    const bottomBuffer = 80

    // Calculate space from the top of this component to the bottom of the window
    const calculated = window.innerHeight - rect.top - bottomBuffer
    gridHeight.value = `${Math.max(300, calculated)}px`
  }
}

onMounted(async () => {
  await nextTick()
  calculateHeight()
  // Stabilization delay
  setTimeout(calculateHeight, 100)
  window.addEventListener('resize', calculateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeight)
})
</script>

<template>
  <div class="app-data-table-container" ref="containerRef" :style="{ height: gridHeight }">
    <DataTable
      v-bind="$attrs"
      :value="value"
      scrollable
      scrollHeight="flex"
      :paginator="paginator"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      class="p-datatable-sm sticky-header-table"
    >
      <!-- Forward all slots to the underlying DataTable -->
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope || {}" />
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.app-data-table-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
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
