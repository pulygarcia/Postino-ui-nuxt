<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import {formatCurrency} from '../lib/utils.ts'
  import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
  import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from '@/components/ui/select'
  import { Input } from '@/components/ui/input';
  import Search from '@/components/Search';
  import DescriptionDialog from '@/components/DescriptionDialog';

  //items composable
  import {useItems} from '../composables/useItems.ts';

  const { items, searchInput, selectedCategory, filteredItems, uniqueCategories } = useItems();
</script>

<template>
  <Container>
    <h1 class="text-lg md:text-2xl font-semibold mt-10">Menu</h1>

    <div class="space-y-3 mt-5">
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
              {{category}}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

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
              {{formatCurrency(item.price)}}
            </TableCell>

            <TableCell class="font-medium">
              {{item.category}}
            </TableCell>

            <TableCell class="text-right">
              <DescriptionDialog :itemName="item.name" :itemDescription="item.description" />
            </TableCell>

          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Container>
</template>
