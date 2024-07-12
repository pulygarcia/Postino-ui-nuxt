<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input id="search" type="text" placeholder="Search..." class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Icon name="mdi:magnify" size="30px" />
    </span>
  </div>
</template>