<script setup>
  import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <Container>
    <h1 class="text-lg md:text-2xl font-semibold mt-10">Cashier</h1>

    <div class="grid grid-cols-3 mt-10 gap-6 items-center">
      <Skeleton class="h-screen w-full rounded-xl col-span-2" />
      <div>
        <Skeleton class="h-screen w-full rounded-xl" />
      </div>
    </div>
  </Container>
</template>