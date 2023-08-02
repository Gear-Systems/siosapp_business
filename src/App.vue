<script setup>
import { ref } from "vue"
import LoginTemplate from "./templates/LoginTemplate.vue"
import AuthorizedTemplate from "./templates/AuthorizedTemplate.vue"
import MainContainer from "./components/Main.vue"
import { useStore } from "vuex"
const store = useStore()

const mobile = ref(false)

const checkScreen = () => {
  const windowsWidth = window.innerWidth
  if (windowsWidth <= 768) {
    mobile.value = true
    return
  }
  mobile.value = false
  // store.state.c.mobileNav = false;
  return
}
window.addEventListener("resize", checkScreen)
checkScreen()
</script>

<template>
  <component
    :is="$route.meta?.layout ? LoginTemplate : AuthorizedTemplate"
    :isMobile="mobile"
  >
  </component>
</template>
