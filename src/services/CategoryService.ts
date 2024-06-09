import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function getCategories() {
  return apiClient.get('/categories')
}

export function addCategory(name: string, products: object[]) {
  return apiClient.post('/categories', {name, products})
}

export function editCategory(categoryId: string) {
  return apiClient.delete(`/categories/${categoryId}`)
}

export function editCategoryProducts(categoryId: string, products: Array<Object>) {
  return apiClient.patch(`/categories/${categoryId}`, {products})
}



