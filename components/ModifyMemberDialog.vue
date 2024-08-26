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
import {useToast} from '../components/ui/toast/use-toast.js'

/**
 * TODO: find a way to send new values without change all the inputs data. Because it throws errors.
 * 
 */

const {toast} = useToast()

const props = defineProps({
    memberID:{
        type: String,
        required: true
    }
})

const {getMemberById, modifyMember} = useStaff();

const formSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    charge: z.string().min(4).max(25),
    salary: z.number().min(50).max(8000),
    phoneNumber: z.number(),
    adress: z.string().min(4).max(30),
    active: z.boolean(),
}))

const form = useForm({
    validationSchema: formSchema,
})

const formData = reactive({
    name: '',
    charge: '',
    salary: '',
    phoneNumber: '',
    adress: '',
    active: true
});

const loadMemberData = async () => {
    try {
        const member = await getMemberById(props.memberID);
        if (member) {
            formData.name = member.name;
            formData.charge = member.charge;
            formData.salary = member.salary;
            formData.phoneNumber = member.phoneNumber;
            formData.adress = member.adress;
            formData.active = member.active;
        }

        //console.log(member);
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
      await modifyMember(props.memberID, values);
    } catch (error) {
      console.log(error);
  }finally{
    //reset visually
    formData.name = '';
    formData.charge = '';
    formData.salary = '';
    formData.phoneNumber = '';
    formData.adress = '';
    formData.active = true;
    //form.resetForm(); //doesn`t work cuz inputs have fixed values
  }

})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button @click="loadMemberData" class="bg-blue-600 hover:bg-blue-400">
        Update <Icon  name="mdi:pencil" size="20" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update a Staff member</DialogTitle>
        <DialogDescription>
          Modify data as you want
        </DialogDescription>
      </DialogHeader>
      
      <form class="space-y-6 mt-10" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
            <Input type="text" placeholder="name" v-model="formData.name" :value="formData.name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="charge">
        <FormItem>
            <FormLabel>Charge</FormLabel>
            <FormControl>
            <Input type="text" placeholder="dishwasher" v-model="formData.charge" :value="formData.charge" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="salary">
        <FormItem>
            <FormLabel>Salary p/month</FormLabel>
            <FormControl>
            <Input type="number" placeholder="1000" v-model="formData.salary" :value="formData.salary" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="phoneNumber">
        <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
            <Input type="number" placeholder="1000" v-model="formData.phoneNumber" :value="formData.phoneNumber" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="adress">
        <FormItem>
            <FormLabel>Adress</FormLabel>
            <FormControl>
            <Input type="text" placeholder="avellaneda 362" v-model="formData.adress" :value="formData.adress" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="active">
          <FormItem>
            <FormLabel>Active?</FormLabel>
            <input class="ms-1" type="checkbox" v-model="formData.active" :value="formData.active" v-bind="componentField">
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