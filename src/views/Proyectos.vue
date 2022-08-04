<template>
  <div class="flex h-full w-full flex-col space-y-14">
    <!-- Nuevos proyectos / pendientes -->
    <div
      class="flex min-h-[50%] w-full flex-col rounded-3xl bg-[#E9F0FC] px-12 py-8"
    >
      <div class="flex h-full w-full space-x-4">
        <div class="w-[15%] min-w-min break-words text-xl font-semibold">
          Agregar nuevo proyecto
        </div>
        <div class="h-full w-[5%]">
          <ProyectoNuevo />
        </div>
        <!-- pendientes -->
        <div
          class="flex h-full w-[60%] cursor-pointer select-none snap-x flex-row overflow-scroll"
        >
            <div
              class="flex h-full w-[40%] min-w-[40%] py-2 px-4"
              v-for="(item, index) in proyectosPendientes"
              :key="index"
              ><proyectos-tarjeta-pendiente-vue :data="item"
            /></div>
        </div>
        <div class="flex h-full w-[23%] select-none py-2 px-4">
          <tarjeta-todos-proyectos />
        </div>
      </div>
    </div>
    <!-- Fin nuevos proyectos / pendientes -->
    <!-- Pestañas -->
    <div class="flex h-full w-full flex-col bg-white">
      <div class="mb-6 text-xl font-semibold">Unidades de Negocio</div>
      <TabGroup @change="cambioPestana">
        <TabList class="border-b-2">
          <Tab
            v-slot="{ selected }"
            as="template"
            v-for="item in unidadesNegocio"
            :key="item"
            ><button
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
        </TabList>
        <TabPanels>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              />
            </div>
          </TabPanel>
          <TabPanel
            ><div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              /></div
          ></TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              /></div
          ></TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              /></div
          ></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <!-- Fin de proyectos en proceso -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useStore } from "vuex";
import ProyectoNuevo from "@/components/ProyectosNuevo.vue";
import ProyectosTarjetaPendienteVue from "@/components/ProyectosTarjetaPendiente.vue";
import ProyectosPestanas from "@/components/ProyectosPestanas.vue";
import ProyectosPestanasTodos from "@/components/ProyectosPestanasTodos.vue";
import ProyectoTarjetaEnProceso from "@/components/ProyectoTarjetaEnProceso.vue";
import {
  getDatabase,
  ref as refDB,
  onValue,
  orderByChild,
  query,
  limitToLast,
  get,
  orderByKey,
} from "@firebase/database";
import { async } from "@firebase/util";
import TarjetaTodosProyectos from "@/components/TarjetaTodosProyectos.vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

const database = getDatabase();
const store = useStore();
const proyectosRef = refDB(database, "proyectos");
const proyectosPendientes = ref([]);
const proyectosEnProceso = ref([]);
const proyectosFinalizados = ref([]);
const snapshotData = ref();
const consulta = ref();

const unidadesNegocio = ref([
  { name: "Todos", disabled: false },
  { name: "Infraestructura", disabled: false },
  { name: "Poliza", disabled: false },
  { name: "Megacable", disabled: false },
  { name: "Ventas", disabled: false },
]);

const drag = () => {
  alert("Hola");
};

const listaProyectos = query(proyectosRef, orderByKey());

function cambioPestana(index) {
  proyectosEnProceso.value = [];
  proyectosFinalizados.value = [];

  Object.entries(snapshotData.value).forEach(([key, value]) => {
    // En proceso
    if (
      (value.estado === "En proceso" &&
        value.unidad === unidadesNegocio.value[index].name) ||
      (value.estado === "En proceso" &&
        unidadesNegocio.value[index].name === "Todos")
    ) {
      proyectosEnProceso.value.push({
        key: key,
        value: value,
      });
    }
    // Finalizados
    if (
      (value.estado === "Finalizado" &&
        value.unidad === unidadesNegocio.value[index].name) ||
      (value.estado === "Finalizado" &&
        unidadesNegocio.value[index].name === "Todos")
    ) {
      proyectosFinalizados.value.push({
        key: key,
        value: value,
      });
    }
  });
}

get(listaProyectos).then((snapshot) => {
  snapshot.forEach((dataSnapshot) => {
    if (dataSnapshot.val().estado === "Pendiente de información") {
      proyectosPendientes.value.push(dataSnapshot);
    }
  });
  // store.commit("queryResult", snapshot.val());
  snapshotData.value = snapshot.val();
  cambioPestana(0);
});

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
};

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 4,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 2.5,
    snapAlign: "start",
  },
};
</script>

<style>
.scroll-barra::-webkit-scrollbar {
  height: 8px;
}
/* Estilos barra (thumb) de scroll */
.scroll-barra::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.scroll-barra::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}

.scroll-barra::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

/* Estilos track de scroll */
.scroll-barra::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}

.scroll-barra::-webkit-scrollbar-track:hover,
.scroll-barra::-webkit-scrollbar-track:active {
  background: #d4d4d4;
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
