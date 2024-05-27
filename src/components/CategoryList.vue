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
                <span class="text-body-1 text-lg-h5 my-lg-3">{{ product.name }}</span>
                <BaseDialog @delete-item="deleteProduct(product.id)"/>
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
            <BaseButoon @addItem="isAddingItem = true">
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
import { editCategoryProducts } from '../services/CategoryService'
import { ref } from 'vue';

interface Product {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

const props = defineProps<{category: Category}>()

const isAddingItem = ref<boolean>(false);
const isEmpty = ref<boolean>(false);


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

  editCategoryProducts(
    props.category.id, 
    categoryProducts
  )
    .then((response) => console.log('Success: ', response))
    .catch((error) => console.log('Failure', error))
}


</script>

<style scoped>

</style>