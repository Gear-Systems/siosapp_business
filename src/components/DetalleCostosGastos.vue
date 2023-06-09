<template>
  <div
    class="flex w-full lg:w-[35%] md:w-[35%] flex-col rounded-lg border-2 border-dashed border-[#1A52B7] bg-white p-8 shadow-md"
  >
    <div class="flex h-full w-full flex-col">
      <div class="flex flex-col w-full h-full">
        <slot name="titulo"></slot>
        <slot name="datos"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>
