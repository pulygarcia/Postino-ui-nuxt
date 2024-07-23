import { useToast } from '@/components/ui/toast/use-toast'


interface Item {
    name: string;
    description: string;
    price: number;
    _id: string;
    category: string;
    quantity?: number;
}

export const useCashier = () => {
  //cashier
  const sellArray = ref<Item[]>([]);
  const loading = ref<boolean>(false);

  const { toast } = useToast();
  const { saveTicket } = useTickets();

  const addToTicket = (item: Item) => {
    // Already exist on the ticket?
    const ticketItem = sellArray.value.find(object => object._id === item._id);

    if (ticketItem) {
      ticketItem.quantity = (ticketItem.quantity ?? 0) + 1; //because is possible undefined

    } else {
      // Item is not in the ticket, add it with quantity 1
      const newItem = { ...item, quantity: 1 };
      sellArray.value.push(newItem);
    }
  };

  const removeFromTicket = (itemID: string) => {
    sellArray.value = sellArray.value.filter(item => item._id !== itemID);
  }

  // Computed property to calculate total to pay
  const totalToPay = computed(() => {
    return sellArray.value.reduce((total, item) => total + item.price * (item.quantity?? 1), 0);
  });


  const registerSale = async () => {
    //get needed data and make an object as ticket to save it
    const ticket = {
      items: sellArray.value.map(item => item._id),
      date: new Date().toISOString(),
      collected: totalToPay.value,
      user: '60d21b4667d0d8992e610c8a',
    };

    if(confirm('Ticket will be saved in the Database')){
      loading.value = true;
      try {
        await saveTicket(ticket);
        // clear the sellArray after successful save
        sellArray.value = [];

        toast({
          title: 'Ticket saved correctly',
          description: new Date().toDateString()
        });
    
      } catch (error:any) {
        //console.error('Error saving ticket:', error);
        toast({
          title: 'Error saving ticket',
          description: error,
          variant: 'destructive'
        });
      }finally{
        loading.value = false;
      }
    }
  };
  
    return {
        addToTicket,
        removeFromTicket,
        totalToPay,
        sellArray,
        registerSale,
        loading
    };
  };