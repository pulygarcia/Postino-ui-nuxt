<script setup lang="ts">
  import {useTickets} from '../composables/useTickets';
  import {formatDate} from '../lib/utils'

  const {tickets} = useTickets();
</script>

<template>
  <Container>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 overflow-hidden">
      <div>
        <DatePicker />
        <h1 class="order-2 lg:order-1 mt-5">Earnings history data</h1>
        <p v-for="ticket in tickets">
          {{ formatDate(ticket.date) }}
        </p>
      </div>
  
      <Chart class="order-1 lg:order-2"/>
    </div>
  </Container>
</template>