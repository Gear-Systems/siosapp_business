<script setup>
import { ref, reactive } from "vue";
import Sidebar from './components/Sidebar.vue';
import SidebarMobile from './components/SidebarMobile.vue';
import MainContainer from './components/Main.vue';
import { useStore } from 'vuex';
const store = useStore();

const checkScreen = () => {
  store.state.c.windowsWidth = window.innerWidth;
  if(store.state.c.windowsWidth  <= 768) {
    store.state.c.mobile = true;
    return;
  }
  store.state.c.mobile = false;
  store.state.c.mobileNav = false;
  return;
}

window.addEventListener("resize", checkScreen)
checkScreen();
</script>

<template>
  <div class="flex w-full h-screen">
      <component :is="$store.state.c.mobile ? SidebarMobile : Sidebar"></component>
    <div class="bg-white w-full h-full overflow-hidden"> <MainContainer /> </div>
  </div>
</template>
