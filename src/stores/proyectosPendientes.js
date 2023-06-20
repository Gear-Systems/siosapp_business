import { ref, reactive, computed } from "vue"
import { defineStore } from "pinia"
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import { notify } from "notiwind"

export const useProyectoPendiente = defineStore("proyecto-pendiente", () => {
  const db = getFirestore()
  const data = ref()
  const isOpen = ref(false)
  const loadings = reactive({
    save: false,
    init: false
  })
  const costos = reactive({
    costoInterno: {
      material: 0,
      manoDeObra: 0,
      total: computed(
        () => costos.costoInterno.material + costos.costoInterno.manoDeObra
      ),
    },
    costoExterno: {
      material: 0,
      manoDeObra: 0,
      total: computed(
        () => costos.costoExterno.material + costos.costoExterno.manoDeObra
      ),
    },
    gastosAdministrativos: {
      fijo: 0,
      nomina: 0,
      variable: 0,
      otros: 0,
      total: computed(
        () =>
          costos.gastosAdministrativos.fijo +
          costos.gastosAdministrativos.nomina +
          costos.gastosAdministrativos.variable +
          costos.gastosAdministrativos.otros
      ),
    },
    totalNeto: computed(
      () =>
        data.value.amountTotal -
        (costos.gastosAdministrativos.fijo +
          costos.gastosAdministrativos.nomina +
          costos.gastosAdministrativos.variable +
          costos.gastosAdministrativos.otros +
          costos.costoExterno.material +
          costos.costoExterno.manoDeObra +
          costos.costoInterno.material +
          costos.costoInterno.manoDeObra)
    ),
    totalBruto: computed(
      () =>
        data.value.amountTotal -
        (costos.costoInterno.material +
          costos.costoInterno.manoDeObra +
          costos.costoExterno.material +
          costos.costoExterno.manoDeObra)
    ),
  })

  const rentabilidad = reactive({
    brutaInicial: computed(
      () => (costos.totalBruto / data.value.amountTotal) * 100
    ),
    netaInicial: computed(
      () => (costos.totalNeto / data.value.amountTotal) * 100
    ),
  })

  async function fetchData(id) {
    const docRef = doc(db, "proyectos", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      data.value = {
        key: id,
        created_format: dateFormat(docSnap.data().created),
        ...docSnap.data(),
      }
      if (docSnap.data().costos) {
        Object.assign(costos, {
          costoInterno: {
            material: docSnap.data().costos.costoInterno.material,
            manoDeObra: docSnap.data().costos.costoInterno.manoDeObra,
            total: computed(
              () =>
                costos.costoInterno.material + costos.costoInterno.manoDeObra
            ),
          },
          costoExterno: {
            material: docSnap.data().costos.costoExterno.material,
            manoDeObra: docSnap.data().costos.costoExterno.manoDeObra,
            total: computed(
              () =>
                costos.costoExterno.material + costos.costoExterno.manoDeObra
            ),
          },
          gastosAdministrativos: {
            fijo: docSnap.data().costos.gastosAdministrativos.fijo,
            nomina: docSnap.data().costos.gastosAdministrativos.nomina,
            variable: docSnap.data().costos.gastosAdministrativos.variable,
            otros: docSnap.data().costos.gastosAdministrativos.otros,
            total: computed(
              () =>
                costos.gastosAdministrativos.fijo +
                costos.gastosAdministrativos.nomina +
                costos.gastosAdministrativos.variable +
                costos.gastosAdministrativos.otros
            ),
          },
        })
      }
    }
  }

  async function saveData() {
    loadings.save= true
    const docRef = doc(db, "proyectos", data.value.key)
    await updateDoc(docRef, {
      rentabilidades: {
        ...rentabilidad,
      },
      costos: {
        ...costos,
      },
    })
    notify({
        group: 'foo',
        title: 'Sucess',
        text: "¡Los datos se han guardado correctamente.!"
    }, 4000)
    loadings.save = false
  }

  async function initProject() {
    loadings.init = true
    const docRef = doc(db, "proyectos", data.value.key)
    await updateDoc(docRef, {
        status: "En proceso",
        initDate: new Date().getTime()
    })
    loadings.init = false
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

  return { data, costos, rentabilidad, loadings, isOpen, fetchData, saveData, initProject }
})
