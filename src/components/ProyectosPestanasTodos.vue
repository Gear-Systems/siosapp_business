<template>
  <div class="flex w-full select-none flex-col space-y-12 bg-white">
    <div class="flex h-[240px] flex-col">
      <div class="flex w-full justify-between">
        <div
          class="flex h-full items-center justify-center space-x-4 text-xl font-semibold"
        >
          <div class="flex h-4 w-4 rounded-full bg-[#2166E5]"></div>
          <div>En proceso</div>
        </div>
      </div>
      <!-- En proceso -->
      <div class="mt-2 flex h-full min-h-[200px] w-full">
        <div
          class="flex w-[260px] py-2 px-4"
          v-for="(item, index) in props.enProceso"
          :key="index"
        >
          <proyecto-tarjeta-en-proceso :data="item" />
        </div>
      </div>
    </div>
    <div class="flex h-full flex-col">
      <div class="flex w-full justify-between">
        <div
          class="flex h-full items-center justify-center space-x-4 text-xl font-semibold"
        >
          <div class="flex h-4 w-4 rounded-full bg-[#143D89]"></div>
          <div>Finalizados</div>
        </div>
        <div class="mr-12 flex items-center justify-center">
          Izquierda | Derecha
        </div>
      </div>
      <!-- Finalizados -->
      <div class="flex h-full min-h-[200px] w-full flex-row overflow-x-auto">
        <div
          class="flex h-full w-[260px] overflow-hidden py-2 px-4"
          v-for="(item, index) in props.finalizados"
          :key="index"
        >
          <proyecto-tarjeta-finalizado :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from "vue";
import { useStore } from "vuex";
import ProyectoTarjetaEnProceso from "@/components/ProyectoTarjetaEnProceso.vue";
import ProyectoTarjetaFinalizado from "./ProyectoTarjetaFinalizado.vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps(["enProceso", "finalizados"]);

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
};

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};
</script>

<style>
.carousel__next {
  background-color: transparent;
  color: black;
}

.carousel__prev {
  background-color: transparent;
  color: black;
}
</style>
