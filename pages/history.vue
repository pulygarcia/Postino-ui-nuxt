<script setup>
  import {useTickets} from '../composables/useTickets';
  import {formatDate, formatCurrency} from '../lib/utils'

  const {tickets, loading} = useTickets();

  const selectedTicket = ref({});
  const isDialogOpen = ref(false);

  const showDetails = (ticket) => {
    selectedTicket.value = ticket;
    isDialogOpen.value = true;
  };
</script>

<template>
  <Container>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 overflow-hidden">
      <div>
        <DatePicker />
        <div v-if="loading" class="flex justify-center mt-28">
          <Loader />
        </div>

        <div v-else-if="tickets.length" class="mt-10">
          <Table>
            <TableCaption>Sells history</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date <Icon name="mdi:calendar"/></TableHead>
                <TableHead>Collected <Icon name="mdi:cash-usd"/></TableHead>
                <TableHead>Employee <Icon name="mdi:account"/></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="ticket in tickets" :key="ticket._id" class="cursor-pointer" @click="showDetails(ticket)">
                <TableCell class="font-medium">
                  {{formatDate(ticket.date)}}
                </TableCell>
                <TableCell class="font-bold text-blue-800">
                  {{formatCurrency(ticket.collected)}}
                </TableCell>
                <TableCell class="font-medium uppercase">
                  {{ticket.user}}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p v-else class="mt-10 text-center text-red-700 font-semibold">There are no saved tickets yet</p>
      </div>

      <Chart class="order-1 lg:order-2"/>
    </div>

    <!-- DIALOG -->
    <SellDialog :open="isDialogOpen" :details="selectedTicket" @close="isDialogOpen = false" />

  </Container>
</template>