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
import {useStaff} from '../composables/useStaff'

const {addMember} = useStaff();

const formSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    charge: z.string().min(4).max(25).trim(),
    salary: z.number().min(50).max(8000),
    phoneNumber: z.number(),
    adress: z.string().min(4).max(30),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values:any) => {
    try {
        await addMember(values);
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
        Add member <Icon  name="mdi:plus" size="20" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add a member to Staff</DialogTitle>
        <DialogDescription>
          Create a new member in the Database
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

        <FormField v-slot="{ componentField }" name="charge">
        <FormItem>
            <FormLabel>Charge</FormLabel>
            <FormControl>
            <Input type="text" placeholder="dishwasher" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="salary">
        <FormItem>
            <FormLabel>Salary p/month</FormLabel>
            <FormControl>
            <Input type="number" placeholder="1000" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="phoneNumber">
        <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
            <Input type="number" placeholder="1000" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="adress">
        <FormItem>
            <FormLabel>Adress</FormLabel>
            <FormControl>
            <Input type="text" placeholder="avellaneda 362" v-bind="componentField" />
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