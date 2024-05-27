<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-icon v-bind="activatorProps" icon="mdi-trash-can-outline"></v-icon>
      </template>

      <v-card
        text="Czy na pewno chcesz usunąć element?"
        class="text-h6"
      >
        <template v-slot:actions>
          <div class="w-100 d-flex justify-space-evenly">
            <v-btn @click="() => {
                $emit('deleteItem')
                dialog = false
              }"
              color="red"
            >
              <v-icon icon="mdi-trash-can-outline"></v-icon>
              Usuń
            </v-btn>

            <v-btn @click="dialog = false">
              Anuluj
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(false);

</script>

<style lang="scss" scoped>

</style>