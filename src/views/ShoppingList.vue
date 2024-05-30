<template>
  <div class="my-5 mx-4">
    <h1 class="mb-4 my-lg-8 text-lg-h3 font-weight-black">Lista </h1>
    <v-expansion-panels :multiple="true">
      <CategoryList 
        v-for="category in shoppingList" 
        :key="category.id" 
        :category="category"
        :categoryProducts="categories.find(cat => cat.id === category.id)?.products ?? []"
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
</template>

<script setup lang="ts">
import { onMounted, ref, computed, toRaw } from 'vue';
import CategoryList from '../components/CategoryList.vue';
import AddItemToListDialog from '../components/AddItemsToListDialog.vue';
import { getShoppingList, addShoppingListCategories, deleteShoppingListCategory, editShoppingListCategoryProducts } from '../services/ShoppingListService';
import { getCategories } from '../services/CategoryService'


const shoppingList = ref([])
const categories = ref([]);
const listCategoriesId = ref([]);
const listCategoryProductsIds = ref([]);

const formCategories = computed(() => {
  return categories.value.filter(category => !listCategoriesId.value.includes(category.id))
})


onMounted(() => {
  getShoppingListValues();

  getCategories()
    .then(response => categories.value = response.data)
})


function getShoppingListValues() {
  getShoppingList()
  .then(response => {
    response.data.forEach(el => {
      el.products.sort((a,b) => (a.isBought === b.isBought) ? 0 : a.isBought ? 1 : -1)
    })

    shoppingList.value = response.data
  })
  .then(() => {
    listCategoriesId.value = []
    shoppingList.value.forEach((el) => {
      listCategoriesId.value.push(el.id)

      el?.products?.forEach(prod => listCategoryProductsIds.value.push(prod.id))
    }
  )


  })
  .catch(e => console.error(e))

}

function addCategories(categories:array) {
  categories.forEach(category => {
    addShoppingListCategories(category)
      .then(() => getShoppingListValues())
      .catch(e => console.error(e))
  })
}

function deleteCategory(CategoryId) {
  deleteShoppingListCategory(CategoryId)
    .then(console.log('deleted'))
    .then(() => getShoppingListValues())
    .catch(e => console.error(e))
}

</script>

<style scoped>

</style>