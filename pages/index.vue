<script setup>
  import {useTickets} from '../composables/useTickets'
  import {useStaff} from '../composables/useStaff'
  import {useItems} from '../composables/useItems'

  const {todayTickets} = useTickets();
  const {members} = useStaff();
  const {items} = useItems();

  
</script>

<template>
  <Container>
    <div class="mt-20">
      <img src="/public/restaurant.svg" alt="restaurant" class="w-[8rem] md:w-[12rem] mx-auto">
      <h1 class="text-center">Restaurant cashier, Earnings history, Staff and menu items administration.</h1>
    </div>
  
    <div class="mt-4 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard :totalCounted="todayTickets" header="Today sales">
        <Icon name="mdi:clipboard-text-search-outline" size="30"/>
      </SummaryCard>
      <SummaryCard :totalCounted="members.length" header="Staff Members">
        <Icon name="mdi:account-group" size="30"/>
      </SummaryCard>
      <SummaryCard :totalCounted="items.length" header="Menu items">
        <Icon name="mdi:food" size="30"/>
      </SummaryCard>
    </div>
  </Container>
</template>