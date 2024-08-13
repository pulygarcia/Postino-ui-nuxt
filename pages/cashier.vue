<script setup lang="ts">
  import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from '@/components/ui/select'
  import {Input}  from '@/components/ui/input';
  import {Button}  from '@/components/ui/button';
  import Search from '@/components/Search.vue';
  import {formatCurrency} from '../lib/utils'

  import {useItems} from '../composables/useItems';
  import {useCashier} from '../composables/useCashier';
  import {useAuth} from '../composables/useAuth';
  
  const { searchInput, selectedCategory, filteredItems, uniqueCategories, loading:loadingItems } = useItems();
  const { addToTicket, removeFromTicket, totalToPay, sellArray, registerSale, loading } = useCashier();
  const { user, logOut } = useAuth();

  definePageMeta({
    middleware: 'auth'
  })

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
              <SelectItem v-for="category in uniqueCategories" :key="category" :value="category">
                {{ category }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div v-if="loadingItems" class="flex justify-center pt-36">
          <Loader />
        </div>

        <div v-else>
          <Table v-if="filteredItems.length">
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
                    <Icon name="mdi:plus-box" color="black" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div v-else class="mt-28 mx-auto">
            <p class="text-red-700 font-semibold">Items not found</p>
          </div>
        </div>
      </div>

      <!-- CASHIER -->
      <div>
        <div class="flex gap-2 items-center mb-2">
          <div class="bg-blue-200 px-1 py-2 inline-block rounded-md">
            <p v-if="user" class="capitalize font-semibold">employee: <span class="uppercase font-bold ms-1">{{ user }}</span></p>
          </div>

          <Button @click="logOut" class="py-1 bg-red-500 hover:bg-red-700">Log out <Icon name="mdi:logout" size="20" class="ms-1" /></Button>
        </div>

        <div class="bg-gray-100 p-2 rounded-md">
          <h1 class="text-lg md:text-2xl font-semibold">Cashier</h1>
          <div v-if="loading" class="flex justify-center mt-28">
            <Loader />
          </div>
          <div v-else-if="sellArray.length">
            <article v-for="item in sellArray" :key="item._id" class="flex items-center justify-between mt-5 p-1 rounded-md">
              <p class="w-36 truncate">{{ item.name }}</p>
              <p class="font-semibold">{{ formatCurrency(item.price) }}</p>
              <Input type="number" min="1" max="50" class="pl-10 w-26" :value="item.quantity" v-model="item.quantity" />
              <Button @click="removeFromTicket(item._id)" type="button" class="bg-red-600 hover:bg-red-800">
                <Icon name="mdi:trash" color="black" />
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
              <Button @click="registerSale()" type="button" class="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md">
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
      </div>
  </Container>
</template>