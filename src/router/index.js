import { createRouter, createWebHistory } from 'vue-router'
import ConstanciaView from '../views/ConstanciaView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/constancia/20250100' // <-- Si entran a la raíz, los manda aquí automáticamente
    },
    {
      path: '/constancia/:cui',
      name: 'constancia',
      component: ConstanciaView,
      props: true
    }
  ]
})

export default router