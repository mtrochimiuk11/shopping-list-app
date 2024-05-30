import { createRouter, createWebHistory } from "vue-router";

import ShoppingList from '../views/ShoppingList.vue';
import Categories from '../views/Categories.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', component: ShoppingList},
  { path: '/categories', component: Categories},
  { path: '/:pathMatch(.*)*', component: NotFound},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;