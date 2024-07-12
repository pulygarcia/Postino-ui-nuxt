<script setup lang="ts">
    import { toTypedSchema } from '@vee-validate/zod'
    import { useForm } from 'vee-validate'
    import * as z from 'zod'
    import {FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from '@/components/ui/form'
    import { Input } from '@/components/ui/input'

    const formSchema = toTypedSchema(z.object({
        username: z.string().min(2).max(50),
        password: z.string().min(6).max(25).trim(),
        repeatPassword: z.string().min(6).max(25).trim(),
    }))

    const form = useForm({
        validationSchema: formSchema,
    })

    const onSubmit = form.handleSubmit((values) => {
        console.log(values);
        form.resetForm();
    })
</script>

<template>
    <form class="w-2/3 space-y-6 mt-10" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
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