<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
  import { Input } from '@/components/ui/input';
  import Search from '@/components/Search';

  const items = ref([]);
  const searchInput = ref('');

  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/menu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      items.value = data.items;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  const filteredItems = computed(() => {
    if(!searchInput.value){
      return items.value
    }

    return items.value.filter(item => item.name.toLowerCase().includes(searchInput.value.toLowerCase()))
  })
</script>

<template>
  <Container>
    <h1 class="text-lg md:text-2xl font-semibold mt-10">Menu</h1>

    <Search class="mt-5">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="searchInput" />
    </Search>

    <div class="mt-10">
      <Table>
        <TableCaption>A list of items of the menu.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in filteredItems" :key="item._id">
            <TableCell class="font-medium">
              {{item.name}}
            </TableCell>
            <TableCell class="font-medium">
              {{item.price}}
            </TableCell>
            <TableCell class="font-medium">
              {{item.category}}
            </TableCell>
            <TableCell class="text-right">
              <Button class="bg-blue-500 hover:bg-blue-400">Description</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Container>
</template>, computed, computed
