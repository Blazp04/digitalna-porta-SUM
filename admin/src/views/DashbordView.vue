<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useColorMode } from '@vueuse/core';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Documents from '@/components/Documents.vue';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import axios from 'axios';

const mode = useColorMode();
mode.value = 'dark';

const response = ref();
const selectedTab = ref(0);
const documentText = ref('');

function updateDocumentText(value: string) {
    documentText.value = value;
}

async function handleClick(index: number) {
    selectedTab.value = index;
    documentText.value = await getDocumentDetails(response.value[index].id);
}

async function deleteDocument(index: number) {
    if (response.value.length > 1) {
        response.value.splice(index, 1);
        if (index === selectedTab.value) {
            selectedTab.value = Math.max(0, index - 1);
        }
        documentText.value = response.value[selectedTab.value]?.fullText || '';
    } else {
        response.value.splice(index, 1);
        selectedTab.value = 0;
        documentText.value = '';
    }
    const api_key = localStorage.getItem('api_key')
    try {
        await axios.post(import.meta.env.VITE_API_BASE_URL + '/delete-document',
            {
                id: response.value[index].id
            },
            {
                headers: {
                    'api-key': api_key,
                }
            });
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

async function saveDocument(index: number) {
    console.log(documentText.value);
    const api_key = localStorage.getItem('api_key')

    try {
        await axios.post(import.meta.env.VITE_API_BASE_URL + '/update-document',
            {
                id: response.value[index].id,
                text: documentText.value
            },
            {
                headers: {
                    'api-key': api_key,
                }
            });
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

async function getDocuments() {
    const api_key = localStorage.getItem('api_key')
    try {
        const responseData = await axios.get(import.meta.env.VITE_API_BASE_URL + '/documents', {
            headers: {
                'api-key': api_key,
            }
        });
        response.value = responseData.data.documents;
        handleClick(selectedTab.value);
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

async function getDocumentDetails(documentID: number) {
    const api_key = localStorage.getItem('api_key')

    try {
        const responseData = await axios.post(import.meta.env.VITE_API_BASE_URL + '/document-details',
            {
                id: documentID
            },
            {
                headers: {
                    'api-key': api_key,
                }
            });
        return responseData.data.document[0].text;
        handleClick(selectedTab.value);
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}
const newDocumentName = ref('');
const newDocumentText = ref('');

async function createDocument() {
    const api_key = localStorage.getItem('api_key')

    try {
        await axios.post(import.meta.env.VITE_API_BASE_URL + '/addData',
            {
                text: newDocumentText.value,
                title: newDocumentName.value
            },
            {
                headers: {
                    'api-key': api_key,
                }
            });
        getDocuments();
        newDocumentName.value = '';
        newDocumentText.value = '';
    } catch (error) {
        console.error("Error fetching documents:", error);
    }

}



onMounted(async () => {
    await getDocuments()
});
</script>

<template>


    <div style="position: fixed; left: 10px; top: 20px; bottom: 10px; width: 300px;">

        <Card style="height: calc(100% - 20px)" class="border-2">
            <CardHeader>
                <CardTitle>Djuro Znanje</CardTitle>
            </CardHeader>
            <CardContent style="overflow-y: auto; height: 100%">
                <Sheet>
                    <SheetTrigger as-child>
                        <Button variant="outline" class="w-full">
                            Dodaj novi dokument
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Dodaj novi dokument</SheetTitle>
                            <SheetDescription>
                                Dodavanjem dokumenta proširuješ znanje koje Đuro ima. Sadržaj dokumenta može se
                                mijenjati dok naslov ne može
                            </SheetDescription>
                        </SheetHeader>
                        <div class="grid gap-4 py-4">
                            <div class="grid grid-cols-4 items-center gap-4">
                                <Label for="name" class="text-right">
                                    Ime
                                </Label>
                                <Input id="name" v-model="newDocumentName" class="col-span-3" />
                            </div>
                            <div class="grid grid-cols-4 items-center gap-4">
                                <Label for="username" class="text-right">
                                    Znanje
                                </Label>
                                <Textarea v-model="newDocumentText" class="col-span-3 flex-1" style="height: 100%"
                                    id="username" />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose as-child>
                                <Button type="button" @click="createDocument">
                                    Dodaj dokument
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <div style="height: 10px;"></div>
                <Documents v-for="(responseItem, index) in response" :key="responseItem.id" :text="responseItem.name"
                    @click="handleClick(index)" :isActive="index === selectedTab" />
            </CardContent>
        </Card>
    </div>
    <Card style="position: fixed; left: 350px; top: 20px; right: 20px; bottom: 30px;" class="border-2">
        <CardHeader>
            <CardTitle>Djuro pregled znanja</CardTitle>
        </CardHeader>
        <CardContent style="height: 90%">
            <Textarea style="height: 90%" :modelValue="documentText" @input="updateDocumentText($event.target.value)" />
            <br>
            <div style="display: flex; gap: 10px;">
                <Button style="background-color: red; color: white;" @click="deleteDocument(selectedTab)">Izbriši
                    dokument</Button>
                <Button @click="saveDocument(selectedTab)">Spremi Izmjene</Button>
            </div>
        </CardContent>
    </Card>
</template>