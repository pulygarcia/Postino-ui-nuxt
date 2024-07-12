<script setup lang="ts">
  
</script>

<template>
  <Container>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 overflow-hidden">
      <div>
        <DatePicker />
        <h1 class="order-2 lg:order-1 mt-5">Earnings history data</h1>
      </div>
  
      <Chart class="order-1 lg:order-2"/>
    </div>
  </Container>
</template>