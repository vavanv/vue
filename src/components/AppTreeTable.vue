<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import TreeTable from 'primevue/treetable'

defineProps<{
  value: any[]
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
  // Small delay to ensure layout is settled
  setTimeout(calculateHeight, 100)
  window.addEventListener('resize', calculateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeight)
})
</script>

<template>
  <div class="app-tree-table-container" ref="containerRef" :style="{ height: gridHeight }">
    <TreeTable
      v-bind="$attrs"
      :value="value"
      scrollable
      scrollHeight="flex"
      :paginator="paginator"
      :rows="rows"
      :rowsPerPageOptions="rowsPerPageOptions"
      class="p-treetable-sm sticky-header-table"
    >
      <!-- Forward all slots to the underlying TreeTable -->
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope || {}" />
      </template>
    </TreeTable>
  </div>
</template>

<style scoped>
.app-tree-table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
}

/* Base style for the table to ensure it takes full height */
:deep(.p-treetable) {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}

:deep(.p-treetable-scrollable) {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 1 auto !important;
  overflow: hidden !important;
}

:deep(.p-treetable-scrollable-viewport) {
  flex: 1 1 auto !important;
}

/* Glassmorphism theme for TreeTable */
:deep(.p-treetable-thead > tr > th) {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: var(--color-primary-light) !important;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

:deep(.p-treetable-tbody > tr) {
  background: transparent !important;
  transition: background-color 0.2s ease;
}

:deep(.p-treetable-tbody > tr:hover) {
  background: rgba(255, 255, 255, 0.03) !important;
}

:deep(.p-treetable-tbody > tr > td) {
  border-color: rgba(255, 255, 255, 0.05) !important;
  color: var(--color-text);
  padding: 0.75rem 1rem !important;
}

/* Paginator styling */
:deep(.p-paginator) {
  background: transparent !important;
  border: none !important;
  border-top: 1px solid var(--color-border) !important;
  padding: 0.5rem !important;
  flex-shrink: 0;
}
</style>
