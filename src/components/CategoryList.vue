<template>
  <v-expansion-panel>
    <div class="d-flex align-center">
        <v-expansion-panel-title class="text-h5 text-lg-h4">
          {{ category.name }}
        </v-expansion-panel-title>
        <BaseDialog @delete-item="$emit('deleteCategory')"/>
      </div>
        <v-expansion-panel-text>
          <v-list>
            <v-list-item v-for="product in category.products" :key="product.id" class="border-b-sm">
              <div class="d-flex justify-space-between align-center">
                <span 
                  class="text-body-1 text-lg-h5 my-lg-3"
                  :class="product.isBought ? 'text-decoration-line-through' : ''"
                >{{ product.name }}</span>
                <div class="d-flex align-center">
                  <div v-if="isShoppingList">
                    <v-icon v-if="!product.isBought" icon="mdi-check-bold" class="mr-4" 
                      @click="() => {
                        product.isBought = true;
                        editShoppingListProducts(category.id, [])
                      }"
                    ></v-icon>
                    <v-icon v-else icon="mdi-close-thick" class="mr-4" 
                      @click="() => {
                        product.isBought = false;
                        editShoppingListProducts(category.id, [])
                      }"
                    ></v-icon>
                  </div>
                  <BaseDialog @delete-item="deleteProduct(product.id)"/>
                </div>
              </div>
            </v-list-item>
            <AddProduct 
              v-if="isAddingItem" 
              :isEmpty="isEmpty"
              :isAddingItem="isAddingItem"
              itemType="product"
              @cancel-adding="() => {
                isAddingItem = false
                isEmpty = false
              }"
              @add-item="(itemName) => addProduct(itemName)"
            />

            <AddItemsToListDialog 
              v-if="isShoppingList" 
              :items="formProducts"
              :isCategory="isCategory"
              @edit-items="selected => editShoppingListProducts(category.id, selected)"
            />
            <BaseButoon v-else @addItem="isAddingItem = true">
              Dodaj Produkt
            </BaseButoon>
          </v-list>
        </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import BaseButoon from './base/BaseButton.vue';
import BaseDialog from './base/BaseDialog.vue';
import AddProduct from './AddProduct.vue';
import AddItemsToListDialog from './AddItemsToListDialog.vue';
import { editCategoryProducts } from '../services/CategoryService'
import { editShoppingListCategoryProducts } from '../services/ShoppingListService';
import { ref, computed, onMounted, watch } from 'vue';

interface Product {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

const props = defineProps<{
  category: Category, 
  isShoppingList: boolean, 
  isCategory?: boolean, 
  categoryProducts?: Array,
  listCategoryProductsIds?: Array
}>()

const isAddingItem = ref<boolean>(false);
const isEmpty = ref<boolean>(false);

watch(props.category.products, () => props.category.products.sort((a,b) => (a.isBought === b.isBought) ? 0 : a.isBought ? 1 : -1))

const formProducts = computed(() => {
  return props.categoryProducts.filter(product => !props.listCategoryProductsIds.includes(product.id))
})


function addProduct(productName: string) {

  if(productName.length === 0) {
    isEmpty.value = true;
    return;
  }

  const categoryProducts = props.category.products;
  const newProductId = props.category.id.toString() + categoryProducts.length ? (categoryProducts.length + 1).toString() : 1;
  const newProduct = {
    "id": Number(newProductId),
    "name": productName
  }

  const newCategoryProducts = [...categoryProducts, newProduct];
  props.category.products.push(newProduct);


  editCategoryProducts(
    props.category.id, 
    newCategoryProducts
  )
    .then((response) => console.log('Success: ', response))
    .catch((error) => console.log('Failure', error))


  isAddingItem.value = false;
  isEmpty.value = false;
}

function deleteProduct(productId: number) {
  const categoryProducts = props.category.products.filter(product => product.id !== productId);
  props.category.products = props.category.products.filter(product => product.id !== productId);

  if (props.isCategory) {
    editCategoryProducts(
      props.category.id, 
      categoryProducts)
      .then((response) => console.log('Success: ', response))
      .catch((error) => console.log('Failure', error))
    
    return;
  }
  
  props.listCategoryProductsIds.pop(productId)
  console.log("Deleted: " + productId)
  editShoppingListCategoryProducts(props.category.id, categoryProducts)
    .then((response) => console.log("Success: ", response))
    .catch((error) => console.log('Failure', error))

}

function editShoppingListProducts(categoryId, products) {
  editShoppingListCategoryProducts(categoryId, [...props.category.products, ...products])
    .then(console.log('success'))
    .then(props.category.products = [...props.category.products, ...products])
}

</script>

<style scoped>

</style>