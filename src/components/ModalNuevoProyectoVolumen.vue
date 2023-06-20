<template>
  <div class="flex w-full flex-col space-y-2">
    <div class="flex w-full flex-col" v-for="n in volumetryControl" :key="n">
      <label class="mb-1 text-sm text-slate-400">Volumetria</label>
      <div class="flex w-full">
        <div
          class="flex h-full w-full rounded-lg border-2 border-fondo-gris bg-white p-1"
        >
          <div class="w-[30%]">
            <input
              v-model="formData[n - 1].volumetry"
              class="w-full border-none bg-white font-semibold focus:ring-0"
              type="number"
              min="0"
            />
          </div>
          <div class="w-[40%]">
            <!-- Volumetría -->
            <Listbox v-model="formData[n - 1].volumetry_type">
              <div class="relative w-full">
                <ListboxButton
                  class="relative w-full cursor-default border-l-2 border-fondo-gris bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate font-semibold">{{
                    formData[n - 1].volumetry_type
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
                      v-for="volumetria in props.volumetrias"
                      :key="volumetria"
                      :value="volumetria"
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
                          >{{ volumetria }}</span
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
          <!-- Unidad de medida -->
          <div class="w-[30%]">
            <Listbox v-model="formData[n - 1].volumetry_unit">
              <div class="relative w-full">
                <ListboxButton
                  class="relative w-full cursor-default border-l-2 border-fondo-gris bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate font-semibold">{{
                    formData[n - 1].volumetry_unit?.atajo
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
                      v-for="medida in props.medidas"
                      :key="medida.atajo"
                      :value="medida"
                      as="template"
                      :title="medida.atajo"
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
                          >{{ medida.atajo }}</span
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
        </div>

        <div
          @click="eliminarVolumetria(n)"
          class="h-15 flex w-5 cursor-pointer items-center justify-center"
          v-if="n != 1"
        >
          <XCircleIcon class="h-full w-full" aria-hidden="true" />
        </div>
      </div>
    </div>
    <div
      v-if="props.volumetrias.length != $store.state.b.controlVolumetria"
      class="flex w-fit cursor-pointer items-center space-x-1"
      @click="addVolumetry"
    >
      <PlusCircleIcon class="h-5 w-5" aria-hidden="true" />
      <div class="text-md">agregar volumetría</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue"
import { useStore } from "vuex"
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
import { useStates } from "../stores/states"
import { storeToRefs } from "pinia"

// Inicializar store
const store = useStore()

// Definir props
const props = defineProps(["volumetrias", "medidas"])
const emits = defineEmits(["update-data"])

// Variables de control
// const selectedVolumetria = ref([props.volumetrias[0].name])

const states = useStates()
const { volumetryControl } = storeToRefs(states)

const formData = ref([
  {
    volumetry: 0,
    volumetry_type: props.volumetrias[0],
    volumetry_unit: props.medidas[0],
  },
])

// Inicializar inputs
store.state.b.volumetrias.push(0)
store.state.b.tipoVolumetrias.push(props.volumetrias[0].name)
store.state.b.unidadVolumetrias.push(props.medidas[0].atajo)

// Agregar volumetria
const addVolumetry = () => {
  formData.value.push({
    volumetry: 0,
    volumetry_type: props.volumetrias[0],
    volumetry_unit: props.medidas[0],
  })
  volumetryControl.value++
}

// Eliminar volumetría
const eliminarVolumetria = (index) => {
  volumetryControl.value--
  formData.value.splice(index - 1, 1)
}

watch(formData.value, (newValue) => {
  emits("update-data", newValue)
})

emits("update-data", formData.value)
</script>
