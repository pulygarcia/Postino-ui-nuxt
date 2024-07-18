<script setup lang="ts">
  import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from '@/components/ui/select'
  import {Input}  from '@/components/ui/input';
  import Search from '@/components/Search.vue';
  import {formatCurrency} from '../lib/utils'

  import {useItems} from '../composables/useItems';

  const { searchInput, selectedCategory, filteredItems, uniqueCategories } = useItems();

  interface Item {
  name: string;
  description: string;
  price: number;
  _id: string;
  category: string;
  quantity?: number;
  }

  //cashier
  const sellArray = ref<Item[]>([]);

  const addToTicket = (item: Item) => {
    // Already exist on the ticket?
    const ticketItem = sellArray.value.find(object => object._id === item._id);

    if (ticketItem) {
      ticketItem.quantity = (ticketItem.quantity ?? 0) + 1; //because is possible undefined

    } else {
      // Item is not in the cart, add it with quantity 1
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

</script>

<template>
  <Container>
    <div class="grid lg:grid-cols-2 mt-10 gap-6">
      <div class="space-y-3">
        <Search>
          <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="searchInput" />
        </Search>
        <Select v-model="selectedCategory">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="category in uniqueCategories" :value="category">
                {{ category }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Table>
          <TableCaption>A list of items of the menu.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in filteredItems" :key="item._id">
              <TableCell class="font-medium">
                {{ item.name }}
              </TableCell>

              <TableCell class="font-medium">
                {{ formatCurrency(item.price) }}
              </TableCell>

              <TableCell class="text-right">
                <Button @click="addToTicket(item)" type="button" class="bg-green-600 hover:bg-green-800">
                  <Icon name="mdi:plus-box" color="black"/>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- CASHIER -->
      <div class="bg-gray-100 p-2 rounded-md">
        <h1 class="text-lg md:text-2xl font-semibold">Cashier</h1>

        <div v-if="sellArray.length">
          <article v-for="item in sellArray" :key="item._id" class="flex items-center justify-between mt-5 p-1 rounded-md">
            <p class="w-36 truncate">{{ item.name }}</p>
            <p class="font-semibold">{{ formatCurrency(item.price) }}</p>
            <Input type="number" min="1" max="50" class="pl-10 w-26" :value="item.quantity" v-model="item.quantity" />
            <Button @click="removeFromTicket(item._id)" type="button" class="bg-red-600 hover:bg-red-800">
                <Icon name="mdi:trash" color="black"/>
            </Button>
          </article>

          <hr class="my-4 border-t border-gray-300" />

          <!-- Total a pagar -->
          <div class="text-center">
            <p class="text-xl font-semibold">Total to Pay</p>
            <p class="text-2xl font-bold">{{ formatCurrency(totalToPay) }}</p>
          </div>

              <!-- Botón "Registrar Venta" -->
          <div class="flex justify-center mt-6">
            <Button type="button" class="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md">
              Register Sale
            </Button>
          </div>
        </div>

        <div v-else>
          <img src="../public/ticket.svg" alt="ticket icon" class="w-36 mx-auto mt-20">
          <p class="text-center mt-4">Start adding items to the ticket</p>
        </div>
      </div>
    </div>
  </Container>
</template>