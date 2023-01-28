import HomeView from '../views/HomeView.vue'
import EmployeeView from '../views/EmployeeView.vue'

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView
  },
  {
    path: '/employee/:id',
    name: 'employee-view',
    component: EmployeeView

  }
]


export default routes
