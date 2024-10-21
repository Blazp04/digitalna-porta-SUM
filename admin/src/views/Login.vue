<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
mode.value = 'dark'

const apiKey = ref<string>('');

const login = async (): Promise<void> => {
  console.log(apiKey.value)
};

</script>

<template>
  <div>
  <form @submit.prevent="login">
    <Card>
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
        <CardDescription>Unesite svoje podatke za prijavu</CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="password" v-model="apiKey" id="password" placeholder="Enter your API key" required/>
      </CardContent>
      <CardFooter>
        <Button type="submit" class="w-full">Login</Button>
        
      </CardFooter>
    </Card>
  </form> 
</div>
</template>
