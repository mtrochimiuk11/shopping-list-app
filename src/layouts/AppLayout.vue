<template>
  <v-navigation-drawer :width="mobile ? undefined : 400" v-model="drawer" class="d-flex">
      <Menu></Menu>
  </v-navigation-drawer>

  <v-app-bar :elevation="2">
    <template v-if="mobile" v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-account"></v-btn>
    </template>
  </v-app-bar>

  <v-main>
    <slot name="main">
    </slot>
  </v-main>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify';
  import Menu from '../views/Menu.vue';

  
  const { mobile } = useDisplay()
  
  const drawer = ref(mobile.value ? false : true)

</script>

<style lang="scss" scoped>

</style>