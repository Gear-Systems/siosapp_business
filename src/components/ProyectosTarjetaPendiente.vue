<template>
  <div
    class="relative flex h-full w-full max-w-[100%] flex-col justify-around space-y-2 overflow-visible rounded-lg bg-white px lg:px-4 xl:px-4 md:px-4"
  >
    <!-- Nombre del proyecto -->
    <div class="relative flex w-full flex-col">
      <div class="relative flex w-full justify-end">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-white hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <img src="/img/menu.svg" alt="" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute -right-16 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active
                        ? 'bg-azul-principal text-[#2166E5]'
                        : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold',
                    ]"
                    @click="$router.push(`/proyectos/${props.data.key}`)"
                  >
                    <div
                      :class="[
                        active ? 'text-azul-letras' : 'text-black',
                        'mr-4 h-5 w-5',
                      ]"
                      aria-hidden="true"
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 12 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3333 11H10.6667V10.3333C10.6667 10.1565 10.5964 9.98695 10.4714 9.86193C10.3464 9.7369 10.1768 9.66667 10 9.66667C9.82319 9.66667 9.65362 9.7369 9.52859 9.86193C9.40357 9.98695 9.33333 10.1565 9.33333 10.3333V11H8.66667C8.48986 11 8.32029 11.0702 8.19526 11.1953C8.07024 11.3203 8 11.4899 8 11.6667C8 11.8435 8.07024 12.013 8.19526 12.1381C8.32029 12.2631 8.48986 12.3333 8.66667 12.3333H9.33333V13C9.33333 13.1768 9.40357 13.3464 9.52859 13.4714C9.65362 13.5964 9.82319 13.6667 10 13.6667C10.1768 13.6667 10.3464 13.5964 10.4714 13.4714C10.5964 13.3464 10.6667 13.1768 10.6667 13V12.3333H11.3333C11.5101 12.3333 11.6797 12.2631 11.8047 12.1381C11.9298 12.013 12 11.8435 12 11.6667C12 11.4899 11.9298 11.3203 11.8047 11.1953C11.6797 11.0702 11.5101 11 11.3333 11ZM6.66667 12.3333H2C1.82319 12.3333 1.65362 12.2631 1.5286 12.1381C1.40357 12.013 1.33333 11.8435 1.33333 11.6667V2.33333C1.33333 2.15652 1.40357 1.98695 1.5286 1.86193C1.65362 1.7369 1.82319 1.66667 2 1.66667H5.33333V3.66667C5.33333 4.1971 5.54405 4.70581 5.91912 5.08088C6.29419 5.45595 6.8029 5.66667 7.33333 5.66667H9.33333V7.66667C9.33333 7.84348 9.40357 8.01305 9.52859 8.13807C9.65362 8.26309 9.82319 8.33333 10 8.33333C10.1768 8.33333 10.3464 8.26309 10.4714 8.13807C10.5964 8.01305 10.6667 7.84348 10.6667 7.66667V5C10.6667 5 10.6667 5 10.6667 4.96C10.6597 4.89876 10.6463 4.83842 10.6267 4.78V4.72C10.5946 4.65145 10.5519 4.58844 10.5 4.53333L6.5 0.533332C6.44489 0.481476 6.38188 0.438719 6.31333 0.406665C6.29128 0.402805 6.26872 0.402805 6.24667 0.406665C6.18184 0.372001 6.11218 0.34728 6.04 0.333332H2C1.46957 0.333332 0.960859 0.544046 0.585787 0.919119C0.210714 1.29419 0 1.8029 0 2.33333V11.6667C0 12.1971 0.210714 12.7058 0.585787 13.0809C0.960859 13.456 1.46957 13.6667 2 13.6667H6.66667C6.84348 13.6667 7.01305 13.5964 7.13807 13.4714C7.2631 13.3464 7.33333 13.1768 7.33333 13C7.33333 12.8232 7.2631 12.6536 7.13807 12.5286C7.01305 12.4036 6.84348 12.3333 6.66667 12.3333ZM6.66667 2.60667L8.39333 4.33333H7.33333C7.15652 4.33333 6.98695 4.26309 6.86193 4.13807C6.73691 4.01305 6.66667 3.84348 6.66667 3.66667V2.60667ZM3.33333 4.33333C3.15652 4.33333 2.98695 4.40357 2.86193 4.52859C2.7369 4.65362 2.66667 4.82319 2.66667 5C2.66667 5.17681 2.7369 5.34638 2.86193 5.4714C2.98695 5.59643 3.15652 5.66667 3.33333 5.66667H4C4.17681 5.66667 4.34638 5.59643 4.4714 5.4714C4.59643 5.34638 4.66667 5.17681 4.66667 5C4.66667 4.82319 4.59643 4.65362 4.4714 4.52859C4.34638 4.40357 4.17681 4.33333 4 4.33333H3.33333ZM6.66667 9.66667H3.33333C3.15652 9.66667 2.98695 9.7369 2.86193 9.86193C2.7369 9.98695 2.66667 10.1565 2.66667 10.3333C2.66667 10.5101 2.7369 10.6797 2.86193 10.8047C2.98695 10.9298 3.15652 11 3.33333 11H6.66667C6.84348 11 7.01305 10.9298 7.13807 10.8047C7.2631 10.6797 7.33333 10.5101 7.33333 10.3333C7.33333 10.1565 7.2631 9.98695 7.13807 9.86193C7.01305 9.7369 6.84348 9.66667 6.66667 9.66667ZM7.33333 7H3.33333C3.15652 7 2.98695 7.07024 2.86193 7.19526C2.7369 7.32029 2.66667 7.48985 2.66667 7.66667C2.66667 7.84348 2.7369 8.01305 2.86193 8.13807C2.98695 8.26309 3.15652 8.33333 3.33333 8.33333H7.33333C7.51014 8.33333 7.67971 8.26309 7.80474 8.13807C7.92976 8.01305 8 7.84348 8 7.66667C8 7.48985 7.92976 7.32029 7.80474 7.19526C7.67971 7.07024 7.51014 7 7.33333 7Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    Agregar información
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active
                        ? 'bg-azul-principal text-[#2166E5]'
                        : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold',
                    ]"
                    @click="$router.push(`/proyectos/${props.data.key}`)"
                  >
                    <div
                      :class="[
                        active ? 'text-azul-letras' : 'text-black',
                        'mr-4 h-5 w-5',
                      ]"
                      aria-hidden="true"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.57574 11.5796H4.4024C4.49014 11.5801 4.57711 11.5633 4.65834 11.5301C4.73956 11.497 4.81344 11.4481 4.87574 11.3863L9.48907 6.76629L11.3824 4.91295C11.4449 4.85098 11.4945 4.77724 11.5283 4.696C11.5622 4.61477 11.5796 4.52763 11.5796 4.43962C11.5796 4.35161 11.5622 4.26448 11.5283 4.18324C11.4945 4.102 11.4449 4.02826 11.3824 3.96629L8.55574 1.10629C8.49376 1.0438 8.42003 0.994205 8.33879 0.960359C8.25755 0.926514 8.17041 0.909088 8.0824 0.909088C7.99439 0.909088 7.90726 0.926514 7.82602 0.960359C7.74478 0.994205 7.67104 1.0438 7.60907 1.10629L5.72907 2.99295L1.1024 7.61295C1.04061 7.67525 0.991731 7.74912 0.958555 7.83035C0.925378 7.91157 0.908561 7.99855 0.909069 8.08629V10.913C0.909069 11.0898 0.979307 11.2593 1.10433 11.3844C1.22936 11.5094 1.39892 11.5796 1.57574 11.5796ZM8.0824 2.51962L9.96907 4.40629L9.0224 5.35295L7.13574 3.46629L8.0824 2.51962ZM2.2424 8.35962L6.19574 4.40629L8.0824 6.29295L4.12907 10.2463H2.2424V8.35962Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    Editar proyecto
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active
                        ? 'bg-azul-principal text-[#2166E5]'
                        : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold',
                    ]"
                    @click="$store.commit('openModalEliminarProyecto')"
                  >
                    <div
                      :class="[
                        active ? 'text-azul-letras' : 'text-black',
                        'mr-4 h-5 w-5',
                      ]"
                      aria-hidden="true"
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 12 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66667 11C4.84348 11 5.01305 10.9298 5.13807 10.8047C5.2631 10.6797 5.33333 10.5101 5.33333 10.3333V6.33334C5.33333 6.15653 5.2631 5.98696 5.13807 5.86193C5.01305 5.73691 4.84348 5.66667 4.66667 5.66667C4.48986 5.66667 4.32029 5.73691 4.19526 5.86193C4.07024 5.98696 4 6.15653 4 6.33334V10.3333C4 10.5101 4.07024 10.6797 4.19526 10.8047C4.32029 10.9298 4.48986 11 4.66667 11ZM11.3333 3H8.66667V2.33334C8.66667 1.8029 8.45595 1.2942 8.08088 0.919122C7.70581 0.54405 7.1971 0.333336 6.66667 0.333336H5.33333C4.8029 0.333336 4.29419 0.54405 3.91912 0.919122C3.54405 1.2942 3.33333 1.8029 3.33333 2.33334V3H0.666667C0.489856 3 0.320286 3.07024 0.195262 3.19526C0.0702379 3.32029 0 3.48986 0 3.66667C0 3.84348 0.0702379 4.01305 0.195262 4.13807C0.320286 4.2631 0.489856 4.33334 0.666667 4.33334H1.33333V11.6667C1.33333 12.1971 1.54405 12.7058 1.91912 13.0809C2.29419 13.456 2.8029 13.6667 3.33333 13.6667H8.66667C9.1971 13.6667 9.70581 13.456 10.0809 13.0809C10.456 12.7058 10.6667 12.1971 10.6667 11.6667V4.33334H11.3333C11.5101 4.33334 11.6797 4.2631 11.8047 4.13807C11.9298 4.01305 12 3.84348 12 3.66667C12 3.48986 11.9298 3.32029 11.8047 3.19526C11.6797 3.07024 11.5101 3 11.3333 3ZM4.66667 2.33334C4.66667 2.15652 4.7369 1.98696 4.86193 1.86193C4.98695 1.73691 5.15652 1.66667 5.33333 1.66667H6.66667C6.84348 1.66667 7.01305 1.73691 7.13807 1.86193C7.2631 1.98696 7.33333 2.15652 7.33333 2.33334V3H4.66667V2.33334ZM9.33333 11.6667C9.33333 11.8435 9.2631 12.0131 9.13807 12.1381C9.01305 12.2631 8.84348 12.3333 8.66667 12.3333H3.33333C3.15652 12.3333 2.98695 12.2631 2.86193 12.1381C2.7369 12.0131 2.66667 11.8435 2.66667 11.6667V4.33334H9.33333V11.6667ZM7.33333 11C7.51014 11 7.67971 10.9298 7.80474 10.8047C7.92976 10.6797 8 10.5101 8 10.3333V6.33334C8 6.15653 7.92976 5.98696 7.80474 5.86193C7.67971 5.73691 7.51014 5.66667 7.33333 5.66667C7.15652 5.66667 6.98695 5.73691 6.86193 5.86193C6.73691 5.98696 6.66667 6.15653 6.66667 6.33334V10.3333C6.66667 10.5101 6.73691 10.6797 6.86193 10.8047C6.98695 10.9298 7.15652 11 7.33333 11Z"
                          fill="#0D0D0D"
                        />
                      </svg>
                    </div>
                    Eliminar proyecto
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <div
        class="flex h-auto w-full justify-center overflow-hidden break-words text-lg font-semibold"
        :title="props.data.val().nombre"
      >
        {{ props.data.val().nombre }}
      </div>
    </div>
    <div class="flex h-[40%] w-full justify-between px-4">
      <div class="flex h-full w-[45%] flex-col">
        <div
          class="flex h-full w-full items-center justify-center rounded-md bg-fondo-gris text-3xl font-semibold text-white"
          :class="[costos ? 'bg-[#44C4A1]' : 'bg-[#E56353]']"
        >
          <!-- <span class="bg-fondo-gris w-5 h-5 rounded-full"></span> -->
          C
        </div>
        <div class="flex w-full justify-center text-sm">Costos</div>
      </div>
      <div class="flex h-full w-[45%] flex-col">
        <div
          class="flex h-full w-full items-center justify-center rounded-md bg-fondo-gris text-3xl font-semibold text-white"
          :class="[gastos ? 'bg-[#44C4A1]' : 'bg-[#E56353]']"
        >
          G
        </div>
        <div class="flex w-full justify-center text-sm">Gastos</div>
      </div>
    </div>
    <ModalEliminarProyecto :data="props.data" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { useRoute } from "vue-router";
import { getDatabase, ref as refDB } from "@firebase/database";
import ModalEliminarProyecto from "./ModalEliminarProyecto.vue";

const props = defineProps(["data"]);
const route = useRoute();
const costos = ref(false);
const gastos = ref(false);

if (props.data) {
  if (
    props.data.hasChild("costoInterno") ||
    props.data.hasChild("costoExterno")
  )
    costos.value = true;
  if (props.data.hasChild("gastos")) gastos.value = true;
}

const copy = () => {
  navigator.clipboard.writeText(
    `http://localhost:3000/proyectos/${props.data.key}`
  );
};
</script>
