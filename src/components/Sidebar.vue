<template>
  <div
    class="h-full border bg-white transition-all duration-300 ease-in"
    :class="[$store.state.a.open ? 'z-40 w-[18%] shadow-right' : 'w-[0%]']"
  >
    <div
      class="duration-600 flex h-full w-full min-w-fit select-none flex-col transition-all"
      :class="[$store.state.a.open ? 'opacity-100' : 'opacity-0']"
    >
      <!-- Bienvenida de usuario -->
      <div class="flex w-full items-center justify-center space-x-4 py-8">
        <!-- ícono -->
        <div>
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full bg-[#101D2D]"
          >
            <img src="/img/user.svg" alt="usuario" />
          </div>
        </div>
        <!-- Rol y nombre de usuario -->
        <div class="flex flex-col">
          <div class="text-xs">Departamento</div>
          <div class="text-lg font-semibold">{{ auth.currentUser?.displayName }}</div>
        </div>
      </div>
      <!-- Fin bienvenida de usuario -->

      <!-- Separador -->
      <div class="flex w-full justify-center">
        <div class="boder h-px w-[80%] rounded-md bg-[#101D2D]"></div>
      </div>
      <!-- Fin separador -->
      <!-- Items para navegar -->
      <ul class="mt-8 flex w-full flex-col space-y-4 px-8 font-semibold">
        <li
          class="flex w-full cursor-pointer space-x-4 rounded-xl py-2 px-4 transition-all duration-200"
          :class="[$route.path == '/dashboard' ? 'bg-blue-siosapp/10' : '']"
          @click="$router.push('/dashboard')"
        >
          <div
            class="flex h-auto w-[20%] items-center justify-center"
            :class="[$route.path == '/dashboard' ? 'text-blue-siosapp' : 'text-black']"
          >
            <svg
              width="22"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9062 16.9375H2.75C2.19771 16.9375 1.75 16.4898 1.75 15.9375V7.47591C1.75 7.19492 1.86822 6.92689 2.07573 6.73742L8.01034 1.31887C8.38626 0.975636 8.96002 0.96957 9.34311 1.30477L15.5648 6.74871C15.7818 6.9386 15.9062 7.21292 15.9062 7.50129V15.9375C15.9062 16.4898 15.4585 16.9375 14.9062 16.9375Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div
            :class="[$route.path == '/dashboard' ? 'text-blue-siosapp' : 'text-black']"
          >
            Dashboard
          </div>
        </li>
        <li
          class="flex w-full cursor-pointer space-x-4 rounded-xl py-2 px-4 transition-all duration-200"
          :class="[$route.path == '/proyectos' ? 'bg-blue-siosapp/10' : '']"
          @click="$router.push('/proyectos')"
        >
          <div
            class="flex h-auto w-[20%] items-center justify-center"
            :class="[
              $route.path == '/proyectos' ? 'text-blue-siosapp' : 'text-black',
            ]"
          >
            <svg
              width="30"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33337 7.08336H14.6667C14.8021 7.08246 14.9356 7.05158 15.0577 6.99294C15.1797 6.9343 15.2872 6.84934 15.3725 6.74419C15.4622 6.64109 15.5276 6.51927 15.5641 6.38764C15.6005 6.256 15.6071 6.11787 15.5834 5.98336L14.6667 1.40002C14.6239 1.18985 14.5087 1.00137 14.3412 0.867374C14.1737 0.733381 13.9645 0.662366 13.75 0.66669H8.25004C8.03559 0.662366 7.82641 0.733381 7.65892 0.867374C7.49143 1.00137 7.37623 1.18985 7.33337 1.40002L6.41671 5.98336C6.39047 6.11652 6.39413 6.25384 6.42742 6.38542C6.46071 6.51699 6.5228 6.63953 6.60921 6.74419C6.69645 6.85176 6.80693 6.93816 6.93236 6.9969C7.05778 7.05565 7.19489 7.0852 7.33337 7.08336ZM9.00171 2.50002H12.9984L13.5484 5.25002H8.45171L9.00171 2.50002ZM20.1667 9.65002C20.1239 9.43985 20.0087 9.25137 19.8412 9.11737C19.6737 8.98338 19.4645 8.91237 19.25 8.91669H13.75C13.5356 8.91237 13.3264 8.98338 13.1589 9.11737C12.9914 9.25137 12.8762 9.43985 12.8334 9.65002L11.9167 14.2334C11.8905 14.3665 11.8941 14.5038 11.9274 14.6354C11.9607 14.767 12.0228 14.8895 12.1092 14.9942C12.1964 15.1018 12.3069 15.1882 12.4324 15.2469C12.5578 15.3056 12.6949 15.3352 12.8334 15.3334H20.1667C20.3021 15.3325 20.4356 15.3016 20.5577 15.2429C20.6797 15.1843 20.7872 15.0993 20.8725 14.9942C20.9622 14.8911 21.0276 14.7693 21.0641 14.6376C21.1005 14.506 21.1071 14.3679 21.0834 14.2334L20.1667 9.65002ZM13.9517 13.5L14.5017 10.75H18.4984L19.0484 13.5H13.9517ZM8.25004 8.91669H2.75004C2.53559 8.91237 2.32641 8.98338 2.15892 9.11737C1.99143 9.25137 1.87623 9.43985 1.83337 9.65002L0.916708 14.2334C0.890469 14.3665 0.894127 14.5038 0.927417 14.6354C0.960707 14.767 1.0228 14.8895 1.10921 14.9942C1.19645 15.1018 1.30693 15.1882 1.43236 15.2469C1.55778 15.3056 1.69489 15.3352 1.83337 15.3334H9.16671C9.3021 15.3325 9.43562 15.3016 9.55766 15.2429C9.67971 15.1843 9.78724 15.0993 9.87254 14.9942C9.96215 14.8911 10.0276 14.7693 10.0641 14.6376C10.1005 14.506 10.1071 14.3679 10.0834 14.2334L9.16671 9.65002C9.12385 9.43985 9.00865 9.25137 8.84116 9.11737C8.67367 8.98338 8.46449 8.91237 8.25004 8.91669ZM2.95171 13.5L3.50171 10.75H7.49837L8.04837 13.5H2.95171Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div
            :class="[
              $route.path == '/proyectos' ? 'text-blue-siosapp' : 'text-black',
            ]"
          >
            Proyectos
          </div>
        </li>
      </ul>
      <div class="flex h-full items-end justify-center text-sm">
        v{{ versionAPP }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { version } from "../../package.json";
import { auth } from "../firebase"

const versionAPP = ref(version);
</script>
