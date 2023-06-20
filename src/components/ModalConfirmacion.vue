<template>
  <TransitionRoot
    appear
    :show="confirmModal"
    as="template"
  >
    <Dialog
      as="div"
      @close="confirmModal = false"
      class="relative z-50"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="
                w-full
                max-w-md
                transform
                overflow-hidden
                rounded-2xl
                bg-white
                p-6
                text-left
                align-middle
                shadow-xl
                transition-all
              "
            >
              <DialogTitle
                as="h3"
                class="flex text-lg font-medium leading-6 text-gray-900"
              >
                <div class="flex justify-center items-center w-full font-semibold text-xl">
                  <slot name="message"></slot>
                </div>
              </DialogTitle>
              <div class="flex flex-col w-full mt-2">
                <div class="flex justify-center items-center w-full">
                  <slot name="question"></slot>
                </div>
                <div
                  class="flex w-full justify-center items-center space-x-8 mt-8"
                >
                  <button
                    type="button"
                    class="
                      inline-flex
                      justify-center
                      rounded-md
                      border border-transparent
                      bg-blue-100
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-blue-900
                      hover:bg-blue-200
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                      focus-visible:ring-offset-2
                    "
                    @click="confirmModal = false"
                  >
                    Cancelar
                  </button>
                  <button
                    @click="emits('confirm')"
                    type="button"
                    class="
                      inline-flex
                      justify-center
                      rounded-md
                      border border-transparent
                      bg-blue-100
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-blue-900
                      hover:bg-blue-200
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                      focus-visible:ring-offset-2
                    "
                  >
                    <slot name="button-message"></slot>
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import { useModals } from "../stores/modals"
import { storeToRefs } from "pinia"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const modals = useModals()
const { confirmModal } = storeToRefs(modals)

const emits = defineEmits(["confirm"])

// const iniciarProyecto = () => {
//   update(refDB(database, `proyectos/${props.id}`), {
//     estado: "En proceso",
//     rentabilidad: {
//       bruta: props.rentabilidad.bruta,
//       neta: props.rentabilidad.neta,
//     },
//     fechaInicio: serverTimestamp(),
//   }).then(() => {
//     store.commit("closeModalConfirmacion");
//     router.push("/proyectos");
//   });
// };
</script>