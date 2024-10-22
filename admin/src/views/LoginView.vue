<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// import App from './App.vue';


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
const router = useRouter();
const login = async (): Promise<void> => {
  // if (apiKey.value === import.meta.env.VITE_ADMIN_PASSWORD) {
  localStorage.setItem('api_key', apiKey.value);
  router.push('/dashboard');
  // }
  // else {
  //   alert("Wrong API key");
  // }
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
          <Input type="password" v-model="apiKey" id="password" placeholder="Enter your API key" required />
        </CardContent>
        <CardFooter>
          <Button type="submit" class="w-full">Login</Button>

        </CardFooter>
      </Card>
    </form>
  </div>
</template>
