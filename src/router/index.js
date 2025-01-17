import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UploadView from '@/views/UploadView.vue'
import OrderView from '@/views/OrderView.vue'
import SearchView from '@/views/SearchView.vue'
import ItemUpdateview from '@/views/ItemUpdateview.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/item/:id',
      name:'update',
      component: ItemUpdateview,
      props: true
    }
  ]
})

export default router
