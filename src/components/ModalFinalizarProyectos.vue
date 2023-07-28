<template>
  <TransitionRoot
    appear
    :show="finalizarFolioModal"
    as="template"
  >
    <Dialog
      as="div"
      @close="finalizarFolioModal = false"
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
                <div
                  class="
                    flex
                    justify-center
                    items-center
                    w-full
                    font-semibold
                    text-xl
                  "
                >
                  Estás a punto de terminar este proyecto
                </div>
              </DialogTitle>
              <div class="flex flex-col w-full mt-2">
                <div class="flex justify-center items-center w-full">
                  ¿Quieres continuar?
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
                    @click="finalizarFolioModal = false"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    @click="finalizar"
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
                    Si, continuar
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useProyectosEnProceso } from "@/stores/proyectosEnProceso"
import { storeToRefs } from "pinia"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { getFirestore, doc, updateDoc } from "firebase/firestore"

const store = useProyectosEnProceso();
const { finalizarFolioModal, data } = storeToRefs(store)
const props = defineProps(["data"]);
const db = getFirestore()
const router = useRouter()

const finalizar = async () => {
  const docRef = doc(db, "proyectos", data.value.key)
  await updateDoc(docRef, {
    status: "finalizado",
    finishDate: new Date().getTime(),
  }).then(() => {
    finalizarFolioModal.value = false
    router.push(`/proyectos/finalizados/${data.value.key}`)
  })
}
  
</script>