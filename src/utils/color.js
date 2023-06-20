export const colorDegradado = (unidad) => {
  let colorDegradado;
  let colorDegradadoDetalleFunc;

  switch (unidad) {
    case "Poliza":
      colorDegradado = "bg-gradient-to-tr from-poliza via-poliza-2 to-poliza-3";
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-poliza to-poliza-3";
      break;
    case "Megacable":
      colorDegradado =
        "bg-gradient-to-tr from-megacable via-megacable-2 to-megacable-3";
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-megacable to-megacable-3";
      break;
    case "Infraestructura":
      colorDegradado =
        "bg-gradient-to-tr from-infraestructura via-infraestructura-2 to-infraestructura-3";
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-infraestructura to-infraestructura-3";
      break;
    case "Ventas":
      colorDegradado = "bg-gradient-to-tr from-ventas via-ventas-2 to-ventas-3";
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-ventas to-ventas-3";
      break;
  }
  return colorDegradado;
};

export const colorDegradadoHover = (unidad) => {
  let colorDegradado;
  let colorDegradadoDetalleFunc;

  switch (unidad) {
    case "Poliza":
      colorDegradado = "hover:bg-gradient-to-tr hover:from-poliza hover:via-poliza-2 hover:to-poliza-3";
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-poliza to-poliza-3";
      break;
    case "Megacable":
      colorDegradado =
        "hover:bg-gradient-to-tr hover:from-megacable hover:via-megacable-2 hover:to-megacable-3";
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-megacable to-megacable-3";
      break;
    case "Infraestructura":
      colorDegradado =
        "hover:bg-gradient-to-tr hover:from-infraestructura hover:via-infraestructura-2 hover:to-infraestructura-3";
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-infraestructura to-infraestructura-3";
      break;
    case "Ventas":
      colorDegradado = "hover:bg-gradient-to-tr hover:from-ventas hover:via-ventas-2 hover:to-ventas-3";
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-ventas to-ventas-3";
      break;
  }
  return colorDegradado;
};

export const colorDegradadoDos = (unidad) => {
  let colorDegradadoDetalleFunc;

  switch (unidad) {
    case "Poliza":
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-poliza to-poliza-3";
      break;
    case "Megacable":
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-megacable to-megacable-3";
      break;
    case "Infraestructura":
      colorDegradadoDetalleFunc =
        "bg-gradient-to-tr from-infraestructura to-infraestructura-3";
      break;
    case "Ventas":
      colorDegradadoDetalleFunc = "bg-gradient-to-tr from-ventas to-ventas-3";
      break;
  }
  return colorDegradadoDetalleFunc;
};

export const colorFondo = (unidad) => {
  let color;
  let efectividadTexto;
  let efectividadFondo;
  switch (unidad) {
    case "Poliza":
      color = "bg-poliza";
      efectividadFondo = "bg-poliza";
      efectividadTexto = "text-poliza";
      break;
    case "Megacable":
      color = "bg-megacable";
      efectividadFondo = "bg-megacable";
      efectividadTexto = "text-megacable";
      break;
    case "Infraestructura":
      color = "bg-infraestructura";
      efectividadFondo = "bg-infraestructura";
      efectividadTexto = "text-infraestructura";
      break;
    case "Ventas":
      color = "bg-ventas";
      efectividadFondo = "bg-ventas";
      efectividadTexto = "text-ventas";
      break;
  }
  return color;
};

export const colorTextoRentabilidadNeta = (unidad) => {
  let colorTexto;
  switch (unidad) {
    case "Poliza":
      colorTexto = "text-poliza";
      break;
    case "Megacable":
      colorTexto = "text-megacable";
      break;
    case "Infraestructura":
      colorTexto = "text-infraestructura";
      break;
    case "Ventas":
      colorTexto = "text-ventas";
      break;
  }

  return colorTexto;
};

export const colorTextoRentabilidadBruta = (unidad) => {
  let colorTexto;
  switch (unidad) {
    case "Poliza":
      colorTexto = "text-poliza-2";
      break;
    case "Megacable":
      colorTexto = "text-megacable-2";
      break;
    case "Infraestructura":
      colorTexto = "text-infraestructura-2";
      break;
    case "Ventas":
      colorTexto = "text-ventas-2";
      break;
  }

  return colorTexto;
};

export const colorFondoRentabilidadBruta = (unidad) => {
  let color;
  switch (unidad) {
    case "Poliza":
      color = "bg-poliza-3";
      break;
    case "Megacable":
      color = "bg-megacable-3";
      break;
    case "Infraestructura":
      color = "bg-infraestructura-3";
      break;
    case "Ventas":
      color = "bg-ventas-3";
      break;
  }
  return color;
};

export const colorFondoRentabilidadNeta = (unidad) => {
  let color;
  switch (unidad) {
    case "Poliza":
      color = "bg-poliza-2";
      break;
    case "Megacable":
      color = "bg-megacable-2";
      break;
    case "Infraestructura":
      color = "bg-infraestructura-2";
      break;
    case "Ventas":
      color = "bg-ventas-2";
      break;
  }
  return color;
};
