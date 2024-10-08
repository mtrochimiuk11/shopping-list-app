<template>
  <div class="my-5 mx-4">
    <h1 class="mb-4 my-lg-8 text-lg-h3 font-weight-black">Lista </h1>
    <div v-if="isLoading" class="loader mx-auto">
      <v-progress-circular color="blue-lighten-3" indeterminate :size="53"></v-progress-circular>
    </div>
    <div v-else>
      <v-expansion-panels :multiple="true" >
        <CategoryList 
          v-for="category in shoppingList" 
          :key="category.id" 
          :category="category"
          :categoryProducts="categories?.find(cat => cat.id === category.id)?.products ?? []"
          @delete-category="deleteCategory(category.id)"
          :isShoppingList=true
          :isCategory="false"
          :listCategoryProductsIds="listCategoryProductsIds"
        />
      </v-expansion-panels>
      <AddItemToListDialog 
        :items="formCategories" 
        :isCategory="true"
        @edit-items="selected => addCategories(selected)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Category, Product } from '../types';
import CategoryList from '../components/CategoryList.vue';
import AddItemToListDialog from '../components/AddItemsToListDialog.vue';
import { getShoppingList, addShoppingListCategories, deleteShoppingListCategory } from '../services/ShoppingListService';
import { getCategories } from '../services/CategoryService'


const shoppingList= ref<Category[] | undefined>([]);
const categories = ref<Category[] | undefined>([]);
const listCategoriesId = ref<string[] | undefined>([]);
const listCategoryProductsIds = ref<string[] | undefined>([]);
const isLoading = ref<Boolean>(false);

const formCategories = computed(() => {
  return categories?.value?.filter(category => !listCategoriesId?.value?.includes(category.id))
})


onMounted(() => {
  getShoppingListValues();

  getCategories()
    .then(response => categories.value = response.data)
})


function getShoppingListValues() {
  isLoading.value = true;
  getShoppingList()
  
  .then(response => {
    response.data.forEach((el: { products: Product[] }) => {
      el.products.sort((a,b) => (a.isBought === b.isBought) ? 0 : a.isBought ? 1 : -1)
    })

    isLoading.value = false;
    shoppingList.value = response.data
  })

  .then(() => {
    listCategoriesId.value = []
    listCategoryProductsIds.value = []
    shoppingList?.value?.forEach((el) => {
      listCategoriesId?.value?.push(el.id)

      el?.products?.forEach(prod => listCategoryProductsIds?.value?.push(prod.id))
    })
  })

  .catch(e => {
    console.error(e)
  })
}

function addCategories(categories:Array<Category>) {
  categories.forEach(category => {
    addShoppingListCategories(category)
      .then(() => getShoppingListValues())
      .catch(e => console.error(e))
  })
}

function deleteCategory(CategoryId: string) {
  deleteShoppingListCategory(CategoryId)
    .then(() => getShoppingListValues())
    .catch(e => console.error(e))
}

</script>

<style scoped>
.loader {
  width: fit-content;
}
</style>