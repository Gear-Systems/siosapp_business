<template>
  <div class="flex h-full max-w-full pb-8">
    <div v-if="data" class="flex w-full justify-between overflow-y-auto">
      <proyectos-pendientes-tarjeta1 />
      <proyectos-pendientes-costos />
      <div
        class="flex w-full flex-col items-center space-y-[4%] px-8 md:w-[50%] lg:w-[32%] xl:w-[32%]"
      >
        <proyectos-pendientes-rentabilidad />
        <proyectos-pendientes-botones />
      </div>
    </div>
    <modal-confirmacion @confirm="iniciarProyecto">
      <template v-slot:message>Iniciar Proyecto.</template>
      <template v-slot:question>¿Estás seguro?</template>
      <template v-slot:button-message>Iniciar</template>
    </modal-confirmacion>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import ModalConfirmacion from "@/components/ModalConfirmacion.vue"
import { useProyectoPendiente } from "../stores/proyectosPendientes"
import { useModals } from "../stores/modals"
import { storeToRefs } from "pinia"
import { notify } from "notiwind"
import ProyectosPendientesTarjeta1 from "@/components/ProyectosPendientesTarjeta1.vue"
import ProyectosPendientesCostos from "@/components/ProyectosPendientesCostos.vue"
import ProyectosPendientesRentabilidad from "@/components/ProyectosPendientesRentabilidad.vue"
import ProyectosPendientesBotones from "@/components/ProyectosPendientesBotones.vue"

const store = useProyectoPendiente()
const modals = useModals()
const { fetchData, initProject } = store
const { data } = storeToRefs(store)
const { confirmModal } = storeToRefs(modals)
const route = useRoute()
const router = useRouter()

const iniciarProyecto = async () => {
  confirmModal.value = false
  await initProject()
  notify(
    {
      group: "foo",
      title: "Sucess",
      text: "¡El proyecto se ha iniciado correctamente.!",
    },
    5000
  )
  router.push({ name: "proyectos" })
}

fetchData(route.params.key)
</script>
