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
import {useToast} from '../components/ui/toast/use-toast.js'


const {toast} = useToast()

const props = defineProps({
    itemID:{
        type: String,
        required: true
    }
})

const {getItemById, modifyItem, uniqueCategories} = useItems();

const formSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(8).max(120),
    price: z.number().min(1),
    category: z.string(),
}))

const form = useForm({
    validationSchema: formSchema,
})


const loadItemData = async () => {
    try {
        const item = await getItemById(props.itemID);
        if (item) {
          //Set these values on each input of vee-validate form, in other way, if you don`t type on each field, it's like they are empty, though they are not visually.
          form.setValues({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category
          });
        }

        //console.log(item);
    } catch (error:any) {
        toast({
          title: 'Could not load member data',
          description: error,
          variant: 'destructive'
        });
    }
}


const onSubmit = form.handleSubmit(async (values:any) => {
  //console.log(values);

  try {
      await modifyItem(props.itemID, values);

    } catch (error) {
      console.log(error);
  }finally{
    //reset visually
    form.resetForm();
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button @click="loadItemData" class="bg-blue-600 hover:bg-blue-400">
        Update <Icon  name="mdi:pencil" size="20" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update a Menu item</DialogTitle>
        <DialogDescription>
          Modify data as you want
        </DialogDescription>
      </DialogHeader>
      
      <form class="space-y-6 mt-10" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
            <Input type="text" placeholder="name" :value="form.values.name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
        <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
            <Input type="text" placeholder="dishwasher" :value="form.values.description" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="price">
        <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
            <Input type="number" placeholder="1000" :value="form.values.price" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="category">
        <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
                <Select v-bind="componentField" :value="form.values.category">
                    <SelectTrigger class="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem 
                            v-for="category in uniqueCategories" 
                            :key="category" 
                            :value="category"
                        >
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
                Save changes
            </Button>
        </DialogFooter>
  </form>
    </DialogContent>
  </Dialog>
</template>