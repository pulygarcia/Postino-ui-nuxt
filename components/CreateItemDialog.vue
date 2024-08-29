<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import {FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from '@/components/ui/form'
import {useItems} from '../composables/useItems'

const {createItem, uniqueCategories, filteredItems} = useItems();

const formSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(8).max(120),
    price: z.number().min(1),
    category: z.string(),
}))

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values:any) => {
    try {
        await createItem(values);
    } catch (error) {
        console.log(error);
    }

    form.resetForm();
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="bg-blue-600 hover:bg-blue-400">
        Create item <Icon  name="mdi:plus" size="20" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add a new menu item</DialogTitle>
        <DialogDescription>
          Create a new item in the Database
        </DialogDescription>
      </DialogHeader>
      
      <form class="space-y-6 mt-10" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
            <Input type="text" placeholder="name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
        <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
            <Input type="textarea" placeholder="delicious plate" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="price">
        <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
            <Input type="number" placeholder="1000" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="category">
        <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
                <Select v-bind="componentField">
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
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <DialogFooter>
            <Button type="submit" class="bg-blue-600 hover:bg-blue-400">
                Add to database
            </Button>
        </DialogFooter>
  </form>
    </DialogContent>
  </Dialog>
</template>