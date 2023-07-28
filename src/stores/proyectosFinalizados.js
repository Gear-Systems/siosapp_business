import { ref, reactive, computed } from "vue"
import { defineStore } from "pinia"
import { getFirestore, doc, getDoc } from "firebase/firestore"

export const useProyectosFinalizados = defineStore(
  "proyectos-finalizados",
  () => {
    const db = getFirestore()
    const data = ref()

    async function fetchData(id) {
      const docRef = doc(db, "proyectos", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        data.value = {
          key: id,
          rentabilidadBrutaPorcentaje: rentabilidadBrutaCalc(docSnap.data()),
          rentabilidadNetaPorcentaje: rentabilidadNetaCalc(docSnap.data()),
          created_format: dateFormat(docSnap.data().created),
          ...docSnap.data(),
        }
      }
    }

    function rentabilidadBrutaCalc(data) {
      let efectividad = (data.rentabilidades.brutaFinal
        ? data.rentabilidades.brutaFinal
        : data.rentabilidades.brutaInicial / data.rentabilidades.brutaInicial) * 100
      return efectividad
    }

    function rentabilidadNetaCalc(data) {
      let efectividad = (data.rentabilidades.netaFinal ? data.rentabilidades.netaFinal : data.rentabilidades.netaInicial / data.rentabilidades.netaInicial) * 100
      return efectividad
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

    return { data, fetchData }
  }
)
