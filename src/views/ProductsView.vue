<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Column from 'primevue/column'
import AppTreeTable from '@/components/AppTreeTable.vue'
import productsData from '@/assets/products.json'
import customersData from '@/assets/customers.json'

interface TreeNode {
  key: string
  data: {
    id: number | string
    name: string
    price?: number
    category: string
    type: 'customer' | 'product'
  }
  children?: TreeNode[]
}

const nodes = ref<TreeNode[]>([])

interface Customer {
  id: number
  name: string
  company: string
  status: string
  email: string
}

interface Product {
  id: number
  name: string
  price: number
  category: string
  customerId: number
}

onMounted(() => {
  const treeNodes: TreeNode[] = (customersData as Customer[]).map((customer: Customer) => {
    // Find products for this customer
    const customerProducts = (productsData as Product[]).filter(
      (p: Product) => p.customerId === customer.id,
    )

    return {
      key: `customer-${customer.id}`,
      data: {
        id: customer.id,
        name: customer.name,
        price: undefined,
        category: 'Customer Group',
        type: 'customer',
      },
      children: customerProducts.map((product: Product) => ({
        key: `product-${product.id}`,
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          type: 'product',
        },
      })),
    }
  })

  nodes.value = treeNodes
})

const formatCurrency = (value?: number) => {
  if (value === undefined) return ''
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
</script>

<template>
  <div class="products-page glass">
    <div class="page-header">
      <h1 class="primary">Products Hierarchy</h1>
      <p>View products organized by assigned customers.</p>
    </div>

    <AppTreeTable
      :value="nodes"
      paginator
      :rows="20"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      tableStyle="min-width: 50rem"
    >
      <Column field="name" header="Name" expander sortable style="width: 40%"></Column>
      <Column field="price" header="Price" sortable style="width: 20%">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.node.data.price) }}
        </template>
      </Column>
      <Column field="category" header="Category / Group" sortable style="width: 20%"></Column>
      <Column field="id" header="ID" sortable style="width: 20%">
        <template #body="slotProps">
          <span :class="['type-badge', slotProps.node.data.type]">
            {{ slotProps.node.data.type.toUpperCase() }}: {{ slotProps.node.data.id }}
          </span>
        </template>
      </Column>
    </AppTreeTable>
  </div>
</template>

<style scoped>
.products-page {
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

.type-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
}

.type-badge.customer {
  border-left: 3px solid var(--color-primary);
  color: var(--color-primary-light);
}

.type-badge.product {
  border-left: 3px solid #ffd700;
  color: #ffd700;
}
</style>
