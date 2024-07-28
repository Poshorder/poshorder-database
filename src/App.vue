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
  left: 0;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);
  gap: 1.7em;
  padding: 1em;
  z-index: 5;
  background-color: #f1f1f1;
}

nav a {
  text-decoration: none;
  text-transform: capitalize;
  color: #252525;
}
</style>
