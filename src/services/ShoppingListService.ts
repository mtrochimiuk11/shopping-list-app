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

export function editShoppingList(list: Array<Object>) {
  return apiClient.patch('/shoppingList', list)
}