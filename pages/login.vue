<script setup>
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>

<template>
  <Container>
    <Tabs default-value="login" class="w-[400px] mx-auto mt-10">
      <TabsList>
        <TabsTrigger value="login">
          Login
        </TabsTrigger>
        <TabsTrigger value="register">
          Register
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Login />
      </TabsContent>

      <TabsContent value="register">
        <Register />
      </TabsContent>

    </Tabs>
  </Container>
</template>