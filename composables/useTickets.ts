interface Ticket {
    items: string[];
    date: string;
    collected: number;
    user: string;
  }

export const useTickets = () => {
    const tickets = ref([]);
      

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tickets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        tickets.value = data;

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });


    const saveTicket = async (ticket:Ticket) => {
        try {
            await fetch('http://localhost:4000/api/tickets', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ticket),
            });

            //console.log('ticket saved correctly');
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
  
    return {
        tickets,
        saveTicket
    };
  };