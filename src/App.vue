<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'home' }">home</RouterLink>
    <RouterLink :to="{ name: 'orders' }">orders</RouterLink>
    <RouterLink :to="{ name: 'upload' }">upload</RouterLink>
    <RouterLink :to="{ name: 'search' }">search</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  gap: 1.7em;
  border-radius: 0.5em;
  padding: 1em;
  z-index: 5;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  text-decoration: none;
  text-transform: capitalize;
  color: #252525;
  font-weight: 600;
}
</style>
