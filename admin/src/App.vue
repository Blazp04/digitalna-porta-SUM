<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { account, databases } from './appwrite'; 
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const email = ref<string>('');
const password = ref<string>('');

// Function to handle login
const login = async (): Promise<void> => {
  try {
    await account.createEmailPasswordSession(email.value, password.value);
    alert('Login successful!');
  } catch (error) {
    alert('Login failed: ' + (error as Error).message);
  }
};

const logout = async (): Promise<void> => {
  await account.deleteSession('current');
  alert('Logout successful!');
}


const documents = ref<any[]>([]); 
const collectionId = '671572050024fbd970e6'; 
const databaseId = '671571f500037e286f98';

const fetchDocuments = async (): Promise<void> => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    documents.value = response.documents;
  } catch (error) {
    console.error('Error fetching documents: ', error);
  }
};

onMounted(() => {
  fetchDocuments();
});
</script>

<template>
    <div class="data-container" style="width: 200px; height: 200px">
      <Carousel>
        <CarouselContent>
          <CarouselItem v-for="(doc, index) in documents" :key="index">{{ doc.text }}</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>


  <div>
  <form @submit.prevent="login">
    <Card>
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
        <CardDescription>Unesite svoje podatke za prijavu</CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="email" v-model="email" id="email" placeholder="Enter your email" required/>
        <br>
        <Input type="password" v-model="password" id="password" placeholder="Enter your password" required/>
      </CardContent>
      <CardFooter>
        <Button type="submit" class="mx-auto">Login</Button>
        
        <Button @click="logout" class="mx-auto">Logout</Button>
        
      </CardFooter>
    </Card>
  </form> 
</div>
  



</template>
