import { createStore } from "vuex";

const navbarControl = {
  state: () => ({
    open: true,
  }),
  mutations: {
    accion(state) {
      state.open = state.open ? false : true;
      localStorage.setItem("open", state.open);
    },
  },
};

const proyectosControl = {
  state: () => ({
    isOpenModalNuevoProyecto: false,
    isOpenModalConfirmacion: false,
    isOpenModalEditarTiempoVolumetria: false,
    isOpenModalEditarCostosGastos: false,
    isOpenModalFinalizarProyecto: false,
    isOpenModalReabrirProyecto: false,
    isOpenModalEliminarProyecto: false,
    controlPoliza: true,
    ingresoFinal: 0,
    rentabildiad: {
      bruta: 0,
      neta: 0,
    },
    proyectoQuery: {},
    volumetrias: [],
    tipoVolumetrias: [],
    unidadVolumetrias: [],
    controlVolumetria: 1,
  }),
  mutations: {
    openModalNuevoProyecto(state) {
      state.isOpenModalNuevoProyecto = true;
    },
    closeModalNuevoProyecto(state) {
      state.isOpenModalNuevoProyecto = false;
    },
    openModalConfirmacion(state) {
      state.isOpenModalConfirmacion = true;
    },
    closeModalConfirmacion(state) {
      state.isOpenModalConfirmacion = false;
    },
    openModalFinalizarProyecto(state) {
      state.isOpenModalFinalizarProyecto = true;
    },
    closeModalFinalizarProyecto(state) {
      state.isOpenModalFinalizarProyecto = false;
    },
    openModalEditarTiempoVolumetria(state) {
      state.isOpenModalEditarTiempoVolumetria = true;
    },
    closeModalEditarTiempoVolumetria(state) {
      state.isOpenModalEditarTiempoVolumetria = false;
    },
    openModalEditarCostosGastos(state) {
      state.isOpenModalEditarCostosGastos = true;
    },
    closeModalEditarCostosGastos(state) {
      state.isOpenModalEditarCostosGastos = false;
    },
    openModalReabrirProyecto(state) {
      state.isOpenModalReabrirProyecto = true;
    },
    closeModalReabrirProyecto(state) {
      state.isOpenModalReabrirProyecto = false;
    },
    openModalEliminarProyecto(state) {
      state.isOpenModalEliminarProyecto = true;
    },
    closeModalEliminarProyecto(state) {
      state.isOpenModalEliminarProyecto = false;
    },
    unidadNegocioPoliza(state, unidad) {
      if (unidad.name === "Poliza") state.controlPoliza = false;
      else state.controlPoliza = true;
    },
    ingresoFinalSave(state, ingreso) {
      state.ingresoFinal = ingreso
        .toLocaleString("en", {
          style: "currency",
          currency: "MXN",
        })
        .replace("MX", "");
    },
    queryResult(state, data) {
      state.proyectoQuery = data;
    },
  },
};

const mobileControl = {
  state: () => ({
    mobile: null,
    mobileNav: null,
    windowsWidth: null,
  }),
};

export const store = createStore({
  modules: {
    a: navbarControl,
    b: proyectosControl,
    c: mobileControl
  },
});
