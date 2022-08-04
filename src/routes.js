import Dashboard from './views/Dashboard.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Proyectos from './views/Proyectos.vue'
import ProyectosPendientes from './views/ProyectosPendientes.vue'
import ProyectosProceso from './views/ProyectosProceso.vue'
import ProyectosFinalizados from './views/ProyectosFinalizados.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  // { path: '/', component: Dashboard, meta: { title: 'Dashboard' } },
  {
    path: '/proyectos', component: Proyectos, meta: { title: 'Proyectos' },
  },
  { path: '/proyectos/:key', component: ProyectosPendientes, meta: { title: 'Proyectos pendientes' } },
  { path: '/proyectos/en-proceso/:key', component: ProyectosProceso, meta: { title: 'Proyectos en proceso' } },
  { path: '/proyectos/finalizados/:key', component: ProyectosFinalizados, meta: { title: 'Proyectos finalizados' } },
  { path: '/', component: Dashboard, meta: { title: 'Dashboard' } },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  { path: '/:path(.*)', component: NotFound },
]
