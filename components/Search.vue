<script setup lang="ts">

</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <slot></slot>
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Icon name="mdi:magnify" size="30px" />
    </span>
  </div>
</template>