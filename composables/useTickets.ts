interface Ticket {
    items: object[];
    date: string;
    collected: number;
    user: { admin?: boolean; } | null;
  }

export const useTickets = () => {
    const tickets = ref([]);
    const loading = ref<boolean>(false);
    const todayTickets = ref(0);
    const todayEarnings = ref(0);

    onMounted(async () => {
      loading.value = true;
      try {
        const response = await fetch('http://localhost:4000/api/tickets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        tickets.value = data;
        getTodaySales();

      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        loading.value = false;
      }
    });


    const saveTicket = async (ticket:Ticket) => {
      loading.value = true;
        try {
            await fetch('http://localhost:4000/api/tickets', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ticket),
            });
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }finally{
            loading.value = false;
          }
    }

    const getTodaySales = () => {
      // Get the range of the day in UTC
      const today = new Date();
      const dayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
      const dayEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));
    
      //console.log('Day start (UTC):', dayStart);
      //console.log('End of the day (UTC):', dayEnd);
    
      const todaySales = tickets.value.filter((ticket: Ticket) => {
        //console.log('Ticket date:', ticket.date);
        const ticketDate = new Date(ticket.date);
        //console.log('Formatted ticket date:', ticketDate);
        return ticketDate >= dayStart && ticketDate <= dayEnd;
      });
    
      // update with today tickets values and get earnings
      todayTickets.value = todaySales.length;
      todayEarnings.value = todaySales.reduce((total, ticket:Ticket) => total + ticket.collected, 0);
    };
  
    return {
        tickets,
        saveTicket,
        loading,
        todayTickets,
        todayEarnings
    };
  };