<template>
  <div class="my-5 mx-4">
    <h1 class="mb-4 my-lg-8 text-lg-h3 font-weight-black">Lista </h1>
    <v-expansion-panels :multiple="true">
      <CategoryList 
        v-for="category in shoppingList" 
        :key="category.id" 
        :category="category"
        
      />
    </v-expansion-panels>
    <AddItemToListDialog :items="formCategories" @edit-items="console.log('aaa')"/>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import CategoryList from '../components/CategoryList.vue';
import AddItemToListDialog from '../components/AddItemsToListDialog.vue';
import { getShoppingList } from '../services/ShoppingListService';
import { getCategories } from '../services/CategoryService'


const shoppingList = ref([])
const categories = ref([]);
const listCategoriesId = ref([]);

const formCategories = computed(() => {
  return categories.value.filter(category => !listCategoriesId.value.includes(category.id))
})

onMounted(() => {
  getShoppingList()
  .then(response => {
    console.log(response.data)
    shoppingList.value = response.data
  })
  .then(() => {
    shoppingList.value.forEach((el) => listCategoriesId.value.push(el.id))
  })

  getCategories()
    .then(response => categories.value = response.data)
})



</script>

<style scoped>

</style>