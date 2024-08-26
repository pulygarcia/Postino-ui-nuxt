<script setup lang="ts">
  import {formatCurrency} from '../lib/utils'
  import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
  import { Badge } from '@/components/ui/badge'
  import { Input } from '@/components/ui/input';
  import Search from '@/components/Search.vue';
  import AddMemberDialog from '@/components/AddMemberDialog.vue';
  import ModifyMemberDialog from '@/components/ModifyMemberDialog.vue';

  //members composable
  import {useStaff} from '../composables/useStaff';

  const { searchInput, filteredMembers, deleteMember } = useStaff();
</script>

<template>
  <Container>
    <h1 class="text-lg md:text-2xl font-semibold mt-10">Staff Members</h1>

    <div>
      <div class="space-y-3 mt-5">
        <Search>
          <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="searchInput" />
        </Search>

        <AddMemberDialog />
      </div>
      <div class="mt-10">
        <Table>
          <TableCaption>A list of members of the staff.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Charge</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead>Adress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="member in filteredMembers">
              <TableCell class="font-medium capitalize">
                {{member.name}}
              </TableCell>
              <TableCell class="font-medium capitalize">
                {{member.charge}}
              </TableCell>
              <TableCell class="font-medium">
                {{formatCurrency(member.salary)}}
              </TableCell>
              <TableCell class="font-medium">
                {{member.phoneNumber}}
              </TableCell>
              <TableCell class="font-medium capitalize">
                {{member.adress}}
              </TableCell>
              <TableCell class="font-medium capitalize">
                <Badge 
                  :class="member.active ? 'bg-green-300 border-green-700 text-green-700' : 'bg-red-300 border-red-700 text-red-700'"
                >
                  {{member.active ? 'active' : 'inactive'}}
                </Badge>
              </TableCell>
              <TableCell class="text-right flex gap-2">
                <Button @click="deleteMember(member._id)" class="bg-red-600 hover:bg-red-500">Delete <Icon name="mdi:trash" class="ms-1" /></Button>
                <ModifyMemberDialog :memberID="member._id" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </Container>
</template>