<template>
  <div class="my-5 mx-4">
    <h1 class="mb-4 my-lg-8 text-lg-h3 font-weight-black">Kategorie</h1>
    <div v-if="isLoading" class="loader mx-auto">
      <v-progress-circular color="blue-lighten-3" indeterminate :size="53"></v-progress-circular>
    </div>
    <div v-else>
      <v-expansion-panels :multiple="true">
        <CategoryList 
          v-for="category in categories" 
          :key="category.id" 
          :category="category"
          @delete-category="deleteCategory(category.id)"
          :isShoppingList="false"
          :isCategory="true"
        />
      </v-expansion-panels>
      <AddProduct 
        v-if="isAddingItem" 
        :isAddingItem="isAddingItem"
        :isEmpty="isEmpty"
        itemType="category"
        @cancel-adding="() => {
          isAddingItem = false
          isEmpty = false
        }"
        @add-item="(itemName) => addNewCategory(itemName)"
      />
      <BaseButton @click="isAddingItem = true">
        Dodaj kategorię
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Category } from '../types';
import { onMounted, ref } from 'vue';
import { getCategories, addCategory, editCategory } from '../services/CategoryService'
import CategoryList from '../components/CategoryList.vue';
import AddProduct from '../components/AddProduct.vue';
import BaseButton from "../components/base/BaseButton.vue";

const categories = ref<Category[]>([]);

const isAddingItem = ref<boolean>(false);
const isEmpty = ref<boolean>(false);
const isLoading = ref<Boolean>(false);


onMounted(() => {
  isLoading.value = true

  getCategories()
    .then(response => {
      categories.value = response.data
      isLoading.value = false
    })
  
})

function addNewCategory(categoryName: string) {
  if(categoryName.length === 0) {
    isEmpty.value = true;
    return;
  }

  addCategory(categoryName, [])
    .then((response) => console.log('Success: ', response))
    .then(() => {
      getCategories()
        .then(response => categories.value = response.data)
    })
    .catch((error) => console.log('Failure', error))

  isAddingItem.value = false;
  isEmpty.value = false;
}

function deleteCategory(categoryId: string) {
  
  editCategory(categoryId)
  .then(() => {
    getCategories()
    .then(response => categories.value = response.data)
  })
}

</script>

<style scoped>
.loader {
  width: fit-content;
}
</style>