<template>
  <div class="d-flex align-center flex-wrap justify-center ml-5 mt-16">
    <div v-for="item in menuItems" :key="item.id" class="py-3 w-100">
      <RouterLink :to="item.link" class="text-decoration-none text-black d-flex align-center" @onClick="console.log('aaa')">
        <v-icon :icon="item.icon"></v-icon>
        <span class="pl-3 text-h5">{{ item.name }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const menuItems = [
  {
    name: 'Lista Zakupów',
    icon: 'mdi-cart-variant',
    link: '/',
    id: 1
  },
  {
    name: 'Kategorie',
    icon: 'mdi-shape',
    link: '/categories',
    id: 2
  }
]
</script>

<style lang="scss" scoped>

</style>