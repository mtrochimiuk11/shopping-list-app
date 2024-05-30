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
          Dodaj {{ isCategory ? "kategorię" : "produkty"}} 
        </BaseButton>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card
          title="Wybierz "
        >
          <v-divider class="mt-3"></v-divider>

          <v-card-text class="px-4" style="height: 300px;">
            <p v-if="items.length === 0" class="mt-4">
              Brak produktów do dodania
            </p>
            <v-checkbox 
              v-else
              v-for="item in items"
              :label="item.name"
              :value="isCategory ? 
              {
                'id': item.id,
                'name': item.name,
                'products': []
              } 
              :
              {
                'id': item.id,
                'name': item.name,
                'isBought': false
              } 
              "
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
            v-if="items.length !== 0"
              color="surface-variant"
              text="Zapisz"
              variant="flat"
              @click="() => {
                $emit('editItems', selected);
                isActive.value = false;
                selected = []
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

const props = defineProps(['items', 'isCategory'])
const selected = ref<array>([])

</script>

<style scoped>

</style>