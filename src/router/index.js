import { createRouter, createWebHistory } from 'vue-router'
import ConstanciaView from '../views/ConstanciaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // Redirección oficial solicitada en la práctica
      redirect: '/constancia/20250100' 
    },
    {
      path: '/constancia/:cui',
      name: 'constancia',
      component: ConstanciaView,
      props: true // Permite inyectar el CUI dinámico como prop a la vista
    }
  ]
})

export default router
