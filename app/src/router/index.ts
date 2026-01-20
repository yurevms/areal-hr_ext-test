import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../components/DashboardView.vue'
import UsersView from '../components/UsersView.vue'
import EmployeesView from '../components/EmployeesView.vue'
import PositionsView from '../components/PositionsView.vue'
import DepartmentsView from '../components/DepartmentsView.vue'
import OrganizationsView from '../components/OrganizationsView.vue'
import HROperationsView from '../components/HROperationsView.vue'
import LogsView from '../components/LogsView.vue'
import FilesView from '../components/FilesView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView},
  { path: '/users', component: UsersView},
  { path: '/employees', component: EmployeesView},
  { path: '/positions', component: PositionsView},
  { path: '/departments', component: DepartmentsView},
  { path: '/organizations', component: OrganizationsView},
  { path: '/hr-operations', component: HROperationsView},
  { path: '/logs', component: LogsView},
  { path: '/files', component: FilesView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
