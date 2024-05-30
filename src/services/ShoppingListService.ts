import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function getShoppingList() {
  return apiClient.get('/shoppingList')
}

export function addShoppingListCategories(categories: Array<Object>) {
  return apiClient.post('/shoppingList', categories)
}

export function deleteShoppingListCategory(categoryId: number) {
  return apiClient.delete(`/shoppingList/${categoryId}`)
}

export function editShoppingListCategoryProducts(categoryId: number, products: Array<Object>) {
  return apiClient.patch(`/shoppingList/${categoryId}`, {products})
}
