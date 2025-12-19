<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<template>
  <ThemeToggle />

  <header class="glass">
    <div class="header-content">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />

      <div class="wrapper">
        <HelloWorld msg="Vue Next Gen" />

        <nav>
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/employees" class="nav-link">Employee</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  margin: 2rem 0;
  padding: 1.5rem;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: block;
}

nav {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: var(--color-background-soft);
}

.nav-link.router-link-exact-active {
  background: var(--primary);
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  nav {
    justify-content: center;
  }
}
</style>
