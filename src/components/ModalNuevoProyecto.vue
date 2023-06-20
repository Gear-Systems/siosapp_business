<template>
  <TransitionRoot appear :show="newProyect" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
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
              class="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="flex text-lg font-medium leading-6 text-gray-900"
              >
                <div class="w-[95%]">Crear nuevo proyecto</div>
                <div class="w-[5%]">
                  <div class="h-5 w-5 rounded-full bg-fondo-gris"></div>
                </div>
              </DialogTitle>
              <div class="mt-2">
                <div class="flex px-5 text-sm text-red-500">
                  <ul type="A" class="flex flex-col space-y-1">
                    <li v-for="error in errores" :key="error" type="disc">
                      {{ error }}
                    </li>
                  </ul>
                </div>
                <form
                  @submit.prevent="crearProyecto"
                  class="mt-6 h-auto w-full space-y-8"
                >
                  <input
                    v-model="formData.name"
                    class="w-full border-x-0 border-t-0 border-fondo-gris placeholder:opacity-60 focus:ring-0"
                    type="text"
                    placeholder="Nombre del proyecto"
                    maxlength="20"
                    minlength="5"
                  />
                  <div class="flex w-full flex-row">
                    <Listbox v-model="formData.business_unit">
                      <div class="relative w-full">
                        <ListboxLabel
                          ><div class="mb-1 text-sm text-slate-400">
                            Unidades de negocio
                          </div>
                        </ListboxLabel>
                        <ListboxButton
                          class="relative w-full cursor-default rounded-md border-2 border-fondo-gris bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        >
                          <span class="block truncate font-semibold">{{
                            formData.business_unit
                          }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <SelectorIcon
                              class="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              v-slot="{ active, selected }"
                              v-for="unidad in data.unidad_negocio"
                              :key="unidad.name"
                              :value="unidad"
                              as="template"
                            >
                              <li
                                :class="[
                                  active
                                    ? 'bg-fondo-gris-claro text-black'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                  ]"
                                  >{{ unidad }}</span
                                >
                                <span
                                  v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                >
                                  <CheckIcon
                                    class="h-5 w-5 text-black"
                                    aria-hidden="true"
                                  />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                  <div class="flex w-full flex-col">
                    <label class="mb-1 text-sm text-slate-400" for="tiempo"
                      >Tiempo</label
                    >
                    <input
                      v-model="formData.time"
                      class="w-full rounded-md border-2 border-fondo-gris bg-white font-semibold"
                      type="number"
                      id="tiempo"
                      min="0"
                    />
                  </div>
                  <!-- Componente volumen -->
                  <modal-nuevo-proyecto-volumen
                    v-if="data.volumetrias"
                    :volumetrias="data.volumetrias"
                    :medidas="data.unidad_medida"
                    @update-data="handleDataUpdate"
                  />
                  <div class="flex w-full flex-col">
                    <label class="text-sm" for="iTotal">Ingreso total</label>
                    <input
                      v-model="formData.amountTotal"
                      class="w-full rounded-md border-2 border-fondo-gris bg-white"
                      type="number"
                      id="iTotal"
                      min="1"
                    />
                  </div>

                  <div
                    class="mt-8 flex w-full items-center justify-center space-x-8"
                  >
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="$store.commit('closeModalNuevoProyecto')"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <div v-if="!loading">Crear</div>
                      <div v-else><IconSpinner /></div>
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch, reactive } from "vue"
import ModalNuevoProyectoVolumen from "./ModalNuevoProyectoVolumen.vue"
import IconSpinner from "./icons/IconSpinner.vue"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue"
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue"
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid"
import { PlusCircleIcon, XCircleIcon } from "@heroicons/vue/outline"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { useRouter } from "vue-router"
import { useModals } from "../stores/modals"
import { storeToRefs } from "pinia"

const modals = useModals()
const router = useRouter()
const { newProyect } = storeToRefs(modals)
const database = getFirestore()
const auth = getAuth()
const proyectsRef = collection(database, "proyectos")
const loading = ref(false)

const data = ref({})
async function fetchData() {
  // obtener unidad de negocio
  const unidadNegocioSnap = await getDoc(doc(database, "config", "catalogos"))
  if (unidadNegocioSnap.exists) {
    console.log(unidadNegocioSnap.data())
    data.value = unidadNegocioSnap.data()
  }
}
await fetchData()

const formData = reactive({
  name: "",
  time: 0,
  amountTotal: 0,
  business_unit: data.value.unidad_negocio[0],
})
const errores = ref([])

const handleDataUpdate = (data) => {
  Object.assign(formData, { volumetryData: data })
}

const crearProyecto = async () => {
  loading.value = true
  const proyectSnap = await addDoc(proyectsRef, {
    ...formData,
    created: new Date().getTime(),
    uid: auth.currentUser.uid,
    status: "Pendiente"
  })
  loading.value = false
  newProyect.value = false
  router.push(`proyectos/${proyectSnap.id}`)
}

const closeModal = () => {
  newProyect.value = false
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
