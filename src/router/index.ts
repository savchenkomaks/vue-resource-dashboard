import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    {
      path: '/new',
      name: 'employee-new',
      component: () => import('../views/EmployeeFormView.vue'),
    },
    {
      path: '/:id/edit',
      name: 'employee-edit',
      component: () => import('../views/EmployeeFormView.vue'),
    },
    {
      path: '/:id',
      name: 'employee-detail',
      component: () => import('../views/EmployeeDetailView.vue'),
    },
  ],
})
