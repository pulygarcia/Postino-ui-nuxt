<script setup lang="ts">
    import { toTypedSchema } from '@vee-validate/zod'
    import { useForm } from 'vee-validate'
    import * as z from 'zod'
    import {FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from '@/components/ui/form'
    import { Input } from '@/components/ui/input'
    import { useToast } from '@/components/ui/toast/use-toast'

    const { toast } = useToast();

    const formSchema = toTypedSchema(z.object({
        userName: z.string().min(2).max(50),
        password: z.string().min(8).max(25).trim(),
        repeatPassword: z.string().min(8).max(25).trim(),
    }))

    const form = useForm({
        validationSchema: formSchema,
    })

    const onSubmit = form.handleSubmit(async (values) => {
      if(values.password !== values.repeatPassword){
        toast({
          title: 'Error',
          description: 'Passwords are not the same',
          variant: 'destructive'
        });

        return;
      }

      const { repeatPassword, ...valuesToSend } = values;

      try {
        const response = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(valuesToSend)
        });

        const data = await response.json();

        //send to the catch in order to show an error toast
        if (!response.ok) {
          throw new Error(data.msg);
        }

        toast({
          title: 'Success',
          description: data.msg,
        });

      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      }

      form.resetForm();
    })
</script>

<template>
    <form class="w-2/3 space-y-6 mt-10" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="userName">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="username" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="repeatPassword">
      <FormItem>
        <FormLabel>Repeat password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="bg-blue-600 hover:bg-blue-400">
      Register
    </Button>
  </form>
</template>