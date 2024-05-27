<template>
  <div class="pa-4 text-center">
    <v-dialog
      width="auto"
      scrollable
    >
      <template v-slot:activator="{ props: activatorProps }">
        <BaseButton
          v-bind="activatorProps"
        >
          Dodaj kategorię do listy zakupów
        </BaseButton>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card
          title="Wybierz "
        >
          <v-divider class="mt-3"></v-divider>

          <v-card-text class="px-4" style="height: 300px;">
            <v-checkbox 
              v-for="item in items"
              :label="item.name"
              :value="item.name"
              v-model="selected"
            ></v-checkbox>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              text="Anuluj"
              @click="isActive.value = false"
            ></v-btn>

            <v-spacer></v-spacer>

            <v-btn
              color="surface-variant"
              text="Zapisz"
              variant="flat"
              @click="() => {
                $emit('editItems');
                isActive.value = false;
              }"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../components/base/BaseButton.vue';
import { defineProps, ref } from 'vue';

const props = defineProps(['items'])
const selected = ref<array>([])

</script>

<style scoped>

</style>