<template>
  <div class="flex h-full w-full flex-col overflow-hidden">
    <!-- Nuevos proyectos / pendientes -->
    <div
      class="flex min-h-[42%] w-full flex-col rounded-xl bg-[#E9F0FC] px-4 py-8 md:min-h-[32%]"
    >
      <div class="flex h-full w-full space-x-4">
        <!-- Agregar nuevo proyecto (solo si el dispositivo es desktop o laptop) -->
        <div
          class="flex w-fit justify-center space-x-4 rounded-xl border-2 border-gray-300 p-2"
          v-if="!$store.state.c.mobile"
        >
          <div
            class="flex w-[15%] min-w-min items-start justify-center break-words text-xl font-semibold"
          >
            Agregar nuevo proyecto
          </div>
          <div class="h-full w-[10%]">
            <ProyectoNuevo />
          </div>
        </div>
        <!-- pendientes -->
        <div
          class="custom-scrollbar flex h-full w-full cursor-pointer select-none flex-row overflow-x-scroll"
        >
          <div
            class="flex h-full w-[40%] min-w-[60%] py-2 px-4 md:min-w-[30%] lg:min-w-[40%] xl:min-w-[30%] xl:max-w-xs"
            v-for="(item, index) in proyectos.todos.pendientes"
            :key="index"
          >
            <ProyectosTarjetaPendiente :data="item" />
          </div>
        </div>
        <!-- <div class="flex h-full w-fit min-w-[170px] select-none py-2 px-4">
          <tarjeta-todos-proyectos />
        </div> -->
      </div>
    </div>
    <!-- Fin nuevos proyectos / pendientes -->
    <!-- Pestañas -->
    <div class="my-6 flex h-full w-full flex-col bg-white">
      <div class="text-xl font-semibold">Unidades de Negocio</div>
      <TabGroup>
        <TabList class="border-b-2">
          <div class="flex overflow-x-auto pt-4">
            <Tab
              v-slot="{ selected }"
              as="template"
              v-for="item in unidadesNegocio"
              :key="item"
              ><button
                @click="changeFilter(item.name)"
                class="select-none border-b-2 bg-white px-14 py-2"
                :class="[
                  selected
                    ? 'border-[#2166E5] font-semibold text-[#2166E5]'
                    : 'border-none text-[#7C8495]',
                ]"
              >
                {{ item.name }}
              </button></Tab
            >
          </div>
        </TabList>
        <TabPanels>
          <TabPanel v-for="item in unidadesNegocio">
            <div class="mt-4">
              <ProyectosAvances />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <!-- Fin de proyectos en proceso -->
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import ProyectoNuevo from "@/components/ProyectosNuevo.vue"
import ProyectosTarjetaPendiente from "@/components/ProyectosTarjetaPendiente.vue"
import ProyectosPestanasTodos from "@/components/ProyectosPestanasTodos.vue"
import TarjetaTodosProyectos from "@/components/TarjetaTodosProyectos.vue"
import { useProyectos } from "../stores/proyectos"
import { storeToRefs } from "pinia"
import ProyectosAvances from "@/components/ProyectosAvances.vue"

const store = useProyectos()
const { proyectos } = storeToRefs(store)
const { fetchData, changeFilter } = store

fetchData()

const proyectosPendientes = ref([
  {
    title: "ver todos los proyectos",
    component: markRaw(TarjetaTodosProyectos),
  },
])
const proyectosEnProceso = ref([])
const proyectosFinalizados = ref([])
const snapshotData = ref()
const consulta = ref()

const unidadesNegocio = ref([
  { name: "Todos", disabled: false },
  { name: "Infraestructura", disabled: false },
  { name: "Poliza", disabled: false },
  { name: "Megacable", disabled: false },
  { name: "Ventas", disabled: false },
])

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
}
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  -webkit-appearance: none;
}

.custom-scrollbar::-webkit-scrollbar:vertical {
  width: 10px;
}

.carousel__viewport {
  height: 100%;
}
.carousel__track {
  height: 100%;
}
.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}
</style>
