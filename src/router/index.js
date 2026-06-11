import { createRouter, createWebHistory } from 'vue-router'
import ConstanciaView from '../views/ConstanciaView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/constancia/:cui',
      name: 'constancia',
      component: ConstanciaView,
      props: true
    }
  ]
})

export default router