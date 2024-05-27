<script setup>
import AppLayout from './layouts/AppLayout.vue'
</script>

<template>
  <v-app>
    <AppLayout>
      <template v-slot:main>
        <RouterView></RouterView>
      </template>
    </AppLayout>
  </v-app>
</template>

<style scoped>

</style>
