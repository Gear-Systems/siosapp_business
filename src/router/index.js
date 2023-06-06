import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Proyectos from "../views/Proyectos.vue";
import ProyectosPendientes from "../views/ProyectosPendientes.vue";
import ProyectosProceso from "../views/ProyectosProceso.vue";
import ProyectosFinalizados from "../views/ProyectosFinalizados.vue";
import LoginView from "../views/LoginView.vue";
import LoginTemplateVue from "@/templates/LoginTemplate.vue";
import { auth } from "../firebase.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/proyectos",
      name: "proyectos",
      component: Proyectos,
      meta: { title: "Proyectos", authorization: true, layout: false },
    },
    {
      path: "/proyectos/:key",
      component: ProyectosPendientes,
      meta: { title: "Proyectos pendientes", authorization: true, layout: false },
    },
    {
      path: "/proyectos/en-proceso/:key",
      component: ProyectosProceso,
      meta: { title: "Proyectos en proceso", authorization: true, layout: false },
    },
    {
      path: "/proyectos/finalizados/:key",
      component: ProyectosFinalizados,
      meta: { title: "Proyectos finalizados", authorization: true, layout: false },
    },
    {
      path: "/",
      name: "login",
      component: LoginView,
      meta: { title: "Login", authorization: false, layout: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { title: "Dashboard", authorization: true, layout: false },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta?.title;
    
  if (to.meta.authorization) {
    if (!(await getCurrentUser())) {
      next({ path: "/" });
    } else next();
  } else if (to.name === "login" && (await getCurrentUser())) {
    next({ path: "/dashboard" });
  } else next();
});

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe();
        resolve(user);
      },
      () => {
        reject();
      }
    );
  });
}

export default router;
