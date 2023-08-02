<template>
  <TransitionRoot appear :show="editarCostoGasto" as="template">
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
              class="w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="flex text-lg font-medium leading-6 text-gray-900"
              >
                <div class="w-[95%] text-2xl font-semibold">
                  <!-- {{ props.data.val().nombre }} -->
                  Editar Costos y Gastos
                </div>
                <div class="w-[5%]">
                  <div class="h-5 w-5 rounded-full bg-fondo-gris"></div>
                </div>
              </DialogTitle>
              <div class="mt-2">
                <div class="flex h-full w-full flex-col bg-white">
                  <TabGroup>
                    <TabList class="border-b-2">
                      <Tab v-slot="{ selected }" as="template"
                        ><button
                          class="border-b-2 bg-white px-7 py-2 text-gray-400"
                          :class="[
                            selected
                              ? 'border-black font-semibold'
                              : 'border-none',
                          ]"
                        >
                          Costo Interno
                        </button></Tab
                      >
                      <Tab v-slot="{ selected }" as="template"
                        ><button
                          class="border-b-2 bg-white px-7 py-2 text-gray-400"
                          :class="[
                            selected
                              ? 'border-black font-semibold'
                              : 'border-none',
                          ]"
                        >
                          Costo Externo
                        </button></Tab
                      >
                      <Tab v-slot="{ selected }" as="template"
                        ><button
                          class="border-b-2 bg-white px-7 py-2 text-gray-400"
                          :class="[
                            selected
                              ? 'border-black font-semibold'
                              : 'border-none',
                          ]"
                        >
                          Gastos
                        </button></Tab
                      >
                    </TabList>
                    <TabPanels>
                      <!-- Costo interno -->
                      <TabPanel>
                        <div class="mt-4 flex w-full flex-col space-y-6">
                          <div class="flex w-full flex-col">
                            <label
                              class="mb-1 text-sm font-semibold"
                              for="costoInternoMaterial"
                              >Material</label
                            >
                            <input
                              v-model="values.costoInterno.material"
                              class="w-full rounded-md border-none bg-fondo-gris-claro"
                              type="number"
                              id="costoInternoMaterial"
                              min="0"
                            />
                          </div>
                          <div class="flex w-full flex-col">
                            <label
                              class="mb-1 text-sm font-semibold"
                              for="costoInternoManoObra"
                              >Mano de obra</label
                            >
                            <input
                              v-model="values.costoInterno.manoDeObra"
                              class="w-full rounded-md border-none bg-fondo-gris-claro"
                              type="number"
                              id="costoInternoManoObra"
                              min="0"
                            />
                          </div>
                        </div>
                      </TabPanel>
                      <!-- Fin costo interno -->
                      <!-- Costo externo -->
                      <TabPanel
                        ><div class="mt-4 flex w-full flex-col space-y-6">
                          <div class="flex w-full flex-col">
                            <label
                              class="mb-1 text-sm font-semibold"
                              for="costoExternoMaterial"
                              >Material</label
                            >
                            <input
                              v-model="values.costoExterno.material"
                              class="w-full rounded-md border-none bg-fondo-gris-claro"
                              type="number"
                              id="costoExternoMaterial"
                              min="0"
                            />
                          </div>
                          <div class="flex w-full flex-col">
                            <label
                              class="mb-1 text-sm font-semibold"
                              for="costoExternoManoObra"
                              >Mano de obra</label
                            >
                            <input
                              v-model="values.costoExterno.manoDeObra"
                              class="w-full rounded-md border-none bg-fondo-gris-claro"
                              type="number"
                              id="costoExternoManoObra"
                              min="0"
                            />
                          </div>
                        </div>
                      </TabPanel>
                      <!-- Fin costo externo -->
                      <!-- gastos -->
                      <TabPanel>
                        <div class="mt-4">
                          <div class="mt-4 flex w-full flex-col space-y-6">
                            <div class="flex w-full flex-col">
                              <label
                                class="mb-1 text-sm font-semibold"
                                for="gastoFijo"
                                >Fijo</label
                              >
                              <input
                                v-model="values.gastosAdministrativos.fijo"
                                class="w-full rounded-md border-none bg-fondo-gris-claro"
                                type="number"
                                id="gastoFijo"
                                min="0"
                              />
                            </div>
                            <div class="flex w-full flex-col">
                              <label
                                class="mb-1 text-sm font-semibold"
                                for="gastoNomina"
                                >Nómina</label
                              >
                              <input
                                v-model="values.gastosAdministrativos.nomina"
                                class="w-full rounded-md border-none bg-fondo-gris-claro"
                                type="number"
                                id="gastoNomina"
                                min="0"
                              />
                            </div>
                            <div class="flex w-full flex-col">
                              <label
                                class="mb-1 text-sm font-semibold"
                                for="gastoVariable"
                                >Variable</label
                              >
                              <input
                                v-model="values.gastosAdministrativos.variable"
                                class="w-full rounded-md border-none bg-fondo-gris-claro"
                                type="number"
                                id="gastoVariable"
                                min="0"
                              />
                            </div>
                            <div class="flex w-full flex-col">
                              <label
                                class="mb-1 text-sm font-semibold"
                                for="gastoOtros"
                                >Otros</label
                              >
                              <input
                                v-model="values.gastosAdministrativos.otros"
                                class="w-full rounded-md border-none bg-fondo-gris-claro"
                                type="number"
                                id="gastoOtros"
                                min="0"
                              />
                            </div>
                          </div></div
                      ></TabPanel>
                      <!-- Fin gastos -->
                    </TabPanels>
                  </TabGroup>
                  <div
                    class="mt-8 flex w-full items-center justify-center space-x-8"
                  >
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      @click="guardar"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Guardar
                    </button>
                  </div>
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
import { onMounted, computed, reactive } from "vue"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { getFirestore, doc, updateDoc } from "firebase/firestore"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { useProyectosEnProceso } from "@/stores/proyectosEnProceso"
import { storeToRefs } from "pinia"

const props = defineProps(["data"])
const db = getFirestore()
const store = useProyectosEnProceso()
const { editarCostoGasto, data } = storeToRefs(store)
const { fetchData } = store
// const store = useStore();
const router = useRouter()
const values = reactive({
  costoInterno: {
    material: 0,
    manoDeObra: 0,
    total: computed(
      () => values.costoInterno.material + values.costoInterno.manoDeObra
    ),
  },
  costoExterno: {
    material: 0,
    manoDeObra: 0,
    total: computed(
      () => values.costoExterno.material + values.costoExterno.manoDeObra
    ),
  },
  gastosAdministrativos: {
    fijo: 0,
    nomina: 0,
    variable: 0,
    otros: 0,
    total: computed(
      () =>
        values.gastosAdministrativos.fijo +
        values.gastosAdministrativos.nomina +
        values.gastosAdministrativos.variable +
        values.gastosAdministrativos.otros
    ),
  },
  totalNetoFinal: computed(
    () =>
      data.value.amountTotal -
      (values.gastosAdministrativos.fijo +
        values.gastosAdministrativos.nomina +
        values.gastosAdministrativos.variable +
        values.gastosAdministrativos.otros +
        values.costoExterno.material +
        values.costoExterno.manoDeObra +
        values.costoInterno.material +
        values.costoInterno.manoDeObra)
  ),
  totalBrutoFinal: computed(
    () =>
      data.value.amountTotal -
      (values.costoInterno.material +
        values.costoInterno.manoDeObra +
        values.costoExterno.material +
        values.costoExterno.manoDeObra)
  ),
  totalNeto: data.value.costos.totalNeto,
  totalBruto: data.value.costos.totalBruto,
})

const rentabilidad = reactive({
    brutaFinal: computed(
      () => (values.totalBrutoFinal / data.value.amountTotal) * 100
    ),
    netaFinal: computed(
      () => (values.totalNetoFinal / data.value.amountTotal) * 100
    ),
    brutaInicial: data.value.rentabilidades.brutaInicial,
    netaInicial: data.value.rentabilidades.netaInicial,
  })

onMounted(() => {
  Object.assign(values, {
    costoInterno: {
      material: data.value.costos.costoInterno.material,
      manoDeObra: data.value.costos.costoInterno.manoDeObra,
      total: computed(
        () => values.costoInterno.material + values.costoInterno.manoDeObra
      ),
    },
    costoExterno: {
      material: data.value.costos.costoExterno.material,
      manoDeObra: data.value.costos.costoExterno.manoDeObra,
      total: computed(
        () => values.costoExterno.material + values.costoExterno.manoDeObra
      ),
    },
    gastosAdministrativos: {
      fijo: data.value.costos.gastosAdministrativos.fijo,
      nomina: data.value.costos.gastosAdministrativos.nomina,
      variable: data.value.costos.gastosAdministrativos.variable,
      otros: data.value.costos.gastosAdministrativos.otros,
      total: computed(
        () =>
          values.gastosAdministrativos.fijo +
          values.gastosAdministrativos.nomina +
          values.gastosAdministrativos.variable +
          values.gastosAdministrativos.otros
      ),
    },
  })
})

const guardar = async () => {
  const docRef = doc(db, "proyectos", data.value.key)
  await updateDoc(docRef, {
    rentabilidades: {
      ...rentabilidad
    }, 
    costos: {
      ...values
    }
  }, )
  fetchData(data.value.key)
   closeModal()
}

const closeModal = () => {
  editarCostoGasto.value = false
}
</script>
