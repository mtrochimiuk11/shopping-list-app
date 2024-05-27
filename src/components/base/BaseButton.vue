<template>
  <v-btn 
    class="mt-4 mx-auto d-flex text-uppercase"
    :size="lgAndUp ? 'x-large' : 'large'"
    :class="lgAndUp ? 'text-h5 w-75' : 'text-h6 w-100'"
    append-icon="mdi-plus-circle"  
    @click="$emit('addItem')"
  >
    <slot></slot>
  </v-btn> 
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { lgAndUp } = useDisplay()
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
</style>