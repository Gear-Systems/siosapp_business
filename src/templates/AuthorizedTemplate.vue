<template>
  <div class="w-screen overflow-hidden md:h-screen lg:h-screen">
    <div class="flex h-full w-full">
      <component :is="props.isMobile ? SidebarMobile : Sidebar"></component>
      <div class="flex w-full flex-col">
        <div class="w-full h-[14%]">
          <MainNavbar />
        </div>
        <div class="p-4">
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

const props = defineProps(["isMobile"]);
</script>
