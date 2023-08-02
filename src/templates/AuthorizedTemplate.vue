<template>
  <div class="overflow-x-hidden md:min-h-screen h-full">
    <div class="flex h-full w-full">
      <component :is="props.isMobile ? SidebarMobile : Sidebar"></component>
      <div class="flex w-full flex-col">
        <div class="w-full h-[14%]">
          <MainNavbar />
        </div>
        <div class="p-4">
          <TarjetaNotificaciones />
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import SidebarMobile from "../components/SidebarMobile.vue";
import MainNavbar from "@/components/MainNavbar.vue";
import TarjetaNotificaciones from "@/components/TarjetaNotificaciones.vue";

const props = defineProps(["isMobile"]);
</script>
