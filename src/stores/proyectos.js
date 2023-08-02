import { ref, reactive, computed } from "vue"
import { defineStore } from "pinia"
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore"

export const useProyectos = defineStore("proyectos", () => {
  const db = getFirestore()
  const proyectos = reactive({
    todos: {
      pendientes: [],
      enProceso: [],
      finalizados: [],
    },
    megacable: {
      pendientes: [],
      enProceso: [],
      finalizados: [],
    },
    infraestructura: {
      pendientes: [],
      enProceso: [],
      finalizados: [],
    },
    poliza: {
      pendientes: [],
      enProceso: [],
      finalizados: [],
    },
    ventas: {
      pendientes: [],
      enProceso: [],
      finalizados: [],
    },
  })

  const proyectosFilter = reactive({
    enProceso: [],
    finalizados: [],
  })

  async function fetchData() {
    clean()
    const docsRef = collection(db, "proyectos")
    const docsSnap = await getDocs(docsRef)
    docsSnap.forEach((doc) => {
      fillArray("todos", { key: doc.id, ...doc.data() })
      switch (doc.data().business_unit) {
        case "Poliza":
          fillArray("poliza", { key: doc.id, ...doc.data() })
          break
        case "Megacable":
          fillArray("megacable", { key: doc.id, ...doc.data() })
          break
        case "Infraestructura":
          fillArray("infraestructura", { key: doc.id, ...doc.data() })
          break
        case "Ventas":
          fillArray("ventas", { key: doc.id, ...doc.data() })
          break
      }
    })
    changeFilter("Todos")
  }

  function changeFilter(business) {
    Object.assign(proyectosFilter, {
      enProceso: proyectos[business.toLowerCase()].enProceso,
      finalizados: proyectos[business.toLowerCase()].finalizados,
    })
  }

  function fillArray(unit, item) {
    switch (item.status) {
      case "Pendiente":
        proyectos[unit].pendientes.push(item)
        break
      case "En proceso":
        proyectos[unit].enProceso.push(item)
        break
    }
  }

  function clean() {
    Object.assign(proyectos, {
      todos: {
        pendientes: [],
        enProceso: [],
        finalizados: [],
      },
      megacable: {
        pendientes: [],
        enProceso: [],
        finalizados: [],
      },
      infraestructura: {
        pendientes: [],
        enProceso: [],
        finalizados: [],
      },
      poliza: {
        pendientes: [],
        enProceso: [],
        finalizados: [],
      },
      ventas: {
        pendientes: [],
        enProceso: [],
        finalizados: [],
      },
    })
  }

  return { proyectos, proyectosFilter, fetchData, changeFilter }
})
