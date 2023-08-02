import { ref, reactive, computed, watch } from "vue"
import { defineStore } from "pinia"
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"
import { notify } from "notiwind"

export const useProyectosEnProceso = defineStore("proyectos-en-proceso", () => {
  const db = getFirestore()
  const data = ref()
  const avances = reactive({
    time: {
      new: 0,
      current: 0,
      isChange: computed(() => (avances.time.new > 0 ? true : false)),
      total: 0,
      progress: computed(() => (avances.time.current / data.value?.time) * 100),
      loading: false,
    },
    volumetrias: [],
  })
  const loadings = reactive({
    time: false,
  })
  const volumetrias = ref([])
  const gastoSelected = ref({})
  const gastoTitulo = ref("Costo Interno")
  const editarCostoGasto = ref(false)
  const finalizarFolioModal = ref(false)

  async function fetchData(id) {
    data.value = null
    gastoSelected.value = {}
    volumetrias.value = []
    avances.volumetrias = []
    const docRef = doc(db, "proyectos", id)
    const docVolumetriesRef = collection(db, "proyectos", id, "volumetrias")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists) {
      data.value = {
        key: id,
        created_format: dateFormat(docSnap.data().created),
        ...docSnap.data(),
      }
      if (docSnap.data().time_current) {
        avances.time.current = docSnap.data().time_current
      }

      const docsVolumetriesSnap = await getDocs(docVolumetriesRef)
      if (!docsVolumetriesSnap.empty) {
        let i = 0
        docsVolumetriesSnap.forEach((e) => {
          avances.volumetrias.push({
            new: 0,
            key: e.id,
            current: e.data().volumetry_current
              ? e.data().volumetry_current
              : 0,
            total: e.data().volumetry,
            progress:
              (!e.data().volumetry_current
                ? 0
                : e.data().volumetry_current / e.data().volumetry) * 100,
            isChange: false,
            ...e.data(),
          })
          i++
        })
        avances.volumetrias.forEach((e, index) => {
          watch(
            () => avances.volumetrias[index],
            () => {
              avances.volumetrias[index].isChange =
                avances.volumetrias[index].new > 0 ? true : false
              avances.volumetrias[index].progress =
                (avances.volumetrias[index].current /
                  avances.volumetrias[index].total) *
                100
            },
            { deep: true }
          )
        })
        gastoTitulo.value = "Costo Interno"
        Object.assign(gastoSelected.value, {
          ...data.value.costos["costoInterno"],
        })
        delete gastoSelected.value.total
      }
    }
  }

  async function saveNewTime() {
    loadings.time = true
    const docRef = doc(db, "proyectos", data.value.key)
    await updateDoc(docRef, {
      time_current: increment(avances.time.new),
      time_updated: new Date().getTime(),
    })
    avances.time.current += avances.time.new
    avances.time.new = 0
    loadings.time = false
    notify(
      {
        group: "foo",
        title: "Sucess",
        text: "¡Los datos se han guardado correctamente.!",
      },
      4000
    )
  }

  async function saveNewVolumetry(index) {
    avances.volumetrias[index].loading = true
    const docVolumetriaRef = doc(
      db,
      "proyectos",
      data.value.key,
      "volumetrias",
      avances.volumetrias[index].key
    )
    await updateDoc(docVolumetriaRef, {
      volumetry_current: increment(avances.volumetrias[index].new),
      volumetry_update: new Date().getTime(),
    })
    avances.volumetrias[index].current += avances.volumetrias[index].new
    avances.volumetrias[index].new = 0
    avances.volumetrias[index].loading = false
    notify(
      {
        group: "foo",
        title: "Sucess",
        text: "¡Los datos se han guardado correctamente.!",
      },
      4000
    )
  }

  function validateInput(a, b) {
    if (a) {
      if (avances[a].new < 0 || !avances[a].new) {
        avances[a].new = 0
      }
    }
    if (b >= 0) {
      if (avances.volumetrias[b].new < 0 || !avances.volumetrias[b].new) {
        avances.volumetrias[b].new = 0
      }
    }
  }

  function detalleFunc(propiedad) {
    let titulo = ""
    switch (propiedad) {
      case "costoInterno":
        titulo = "Costo Interno"
        break
      case "costoExterno":
        titulo = "Costo Externo"
        break
      case "gastosAdministrativos":
        titulo = "Gastos Administrativos"
        break
    }
    gastoSelected.value = {
      ...data.value.costos[propiedad],
    }
    gastoTitulo.value = titulo
    delete gastoSelected.value.total
    console.log(gastoSelected.value)
  }

  function dateFormat(date) {
    const toFormat = new Date(date)
    const format = `${toFormat.getDate().toString().padStart(2, "0")}/${(
      toFormat.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${toFormat.getFullYear()}`
    return format
  }

  return {
    data,
    avances,
    loadings,
    gastoSelected,
    gastoTitulo,
    editarCostoGasto,
    finalizarFolioModal,
    fetchData,
    validateInput,
    saveNewTime,
    saveNewVolumetry,
    detalleFunc,
  }
})
