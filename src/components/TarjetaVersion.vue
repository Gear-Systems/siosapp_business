<template>
  <div class="flex w-[70%] flex-col space-y-4 rounded-md bg-gray-50 p-2">
    <div class="flex text-2xl font-semibold">
      NOTAS DE LA VERSION {{ version }}
    </div>
    <div class="flex pl-5">
      <ol>
        <li v-for="value in notasVersion" class="mb-4" type="1">
          {{ value.descripcion }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { version } from "../../package.json";

const notasVersion = [
  {
    descripcion:
      "Si tienen problema o sugerencias con la aplicación enviar correo a: soporte_business@iosgs.com",
  },
  {
    descripcion:
      "La aplicación estará en constantes cambios de interfaz (diseño)",
  },
  {
    descripcion:
      "En esta versión no se puede cambiar el ingreso final en las unidades de negocio que no sean de Poliza. Este problema se solucionará con la versión 1.1.0 con fecha de lanzamiento el dia 22/08/2022",
  },
  {
    descripcion:
      "La sección 'Todos los proyectos' será lanzada en la versión 1.1.0 (22/08/2022)",
  },
  {
    descripcion: "Se corrigieron bugs al entrar a la aplicación."
  },
];
</script>
