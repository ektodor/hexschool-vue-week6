import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'carts',
        component: () => import('../views/front/CartsView.vue')
      },
      {
        path: 'login',
        component: () => import('../views/LoginView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/admin/BackView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsView.vue')
      },
      {
        path: 'orderRecord',
        component: () => import('../views/admin/OrderRecordView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
