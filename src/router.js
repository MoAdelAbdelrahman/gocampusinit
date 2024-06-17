import { createMemoryHistory, createRouter } from 'vue-router'

import ARview from './components/ar-view.vue'  
import Home from './components/home-view.vue'
const routes = [
  
  { path: '/ar', component: ARview },
  { path: '/', component: Home}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router