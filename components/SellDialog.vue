<script setup lang="ts">
    import {formatCurrency, formatDate} from '../lib/utils'
    import {useItems} from '../composables/useItems'

    const {items} = useItems();

    defineProps({
        details:{
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['close']);

    const getItem = (itemDetail:any) => {
      return {
        item: items.value.filter(item => item._id == itemDetail.id)[0].name?? '',
        quantity: itemDetail.quantity
      };
    }
</script>

<template>
  <Dialog>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="mb-3 text-lg">{{ formatDate(details.date) }}</DialogTitle>
        <DialogDescription class="space-y-6">
            <p class="font-semibold">Employee: <span class="text-black">Pepito</span></p>
            <div>
              <p class="font-semibold text-lg">Consumed</p>
              <ul>
                <li v-for="item in details.items" class="text-black">
                  {{ getItem(item).item + ' (' +getItem(item).quantity + ' )'}}
                </li>
              </ul>
            </div>
            <p class="font-semibold text-lg">Collected: <span class="text-blue-700 text-xl font-bold">{{ formatCurrency(details.collected)?? '' }}</span></p>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="sm:justify-start">
          <Button type="button" variant="secondary" @click="emit('close')">
            Close
          </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>