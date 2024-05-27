<template>
  <div v-if="isAddingItem">
    <v-list-item class="mt-3 my-lg-3">
      <v-alert 
        v-if="isEmpty"
        text="Pole nie może być puste" 
        type="error" 
        density="compact"
      />
      <v-text-field
        :label="itemType === 'product' ? 'Nazwa produktu' : 'Nazwa kategorii'"
        v-model="itemName"
      />
      <div class="pb-1 d-flex flex-column align-center">
        <v-btn 
          size="large" 
          class="w-75 w-lg-25 ml-lg-1 mb-4" 
          @click="() => {
            $emit('addItem', itemName)
            itemName = ''
          }"
        >
          <template v-slot>
            <span class="text-green font-weight-bold">Dodaj</span>
          </template>
          <template v-slot:append>
            <v-icon icon="mdi-check-bold" color="green"></v-icon>
          </template>
        </v-btn>
        <v-btn size="large" class="w-75 w-lg-25" @click="$emit('cancelAdding')">
          <template v-slot>
            <span class="text-red font-weight-bold">Anuluj</span>
          </template>
          <template v-slot:append>
            <v-icon icon="mdi-close-thick" color="red"></v-icon>
          </template>
        </v-btn>
      </div>
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isAddingItem: boolean;
  isEmpty: boolean;
  itemType: string
}>()

let itemName = ref<String>('')


</script>

<style scoped>

</style>