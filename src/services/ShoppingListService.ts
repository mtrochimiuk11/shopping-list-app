import axios from "axios";
import { Category, Product } from "../types";

const apiClient = axios.create({
  baseURL: 'https://shopping-list-appp.onrender.com/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function getShoppingList() {
  return apiClient.get('/shoppingList')
}

export function addShoppingListCategories(categories: Array<Category> | Category) {
  return apiClient.post('/shoppingList', categories)
}

export function deleteShoppingListCategory(categoryId: string) {
  return apiClient.delete(`/shoppingList/${categoryId}`)
}

export function editShoppingListCategoryProducts(categoryId: string, products: Array<Product>) {
  return apiClient.patch(`/shoppingList/${categoryId}`, {products})
}
