<script setup>
  import { Skeleton } from '@/components/ui/skeleton'
  import Search from '@/components/Search'
</script>

<template>
  <Container>
    <h1 class="text-lg md:text-2xl font-semibold mt-10">Menu</h1>

    <Search class="mt-5" />

    <div class="mt-10 space-y-4">
      <Skeleton class="h-20 w-full rounded-xl" />
      <Skeleton class="h-20 w-full rounded-xl" />
      <Skeleton class="h-20 w-full rounded-xl" />
      <Skeleton class="h-20 w-full rounded-xl" />
    </div>
  </Container>
</template>
