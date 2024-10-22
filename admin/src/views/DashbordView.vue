<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useColorMode } from '@vueuse/core';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Documents from '@/components/Documents.vue';
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

async function handleClick(index: number) {
    selectedTab.value = index;
    documentText.value = await getDocumentDetails(response.value[index].id);
}

function deleteDocument(documentID: number) {
    if (response.value.length > 1) {
        response.value.splice(documentID, 1);
        if (documentID === selectedTab.value) {
            selectedTab.value = Math.max(0, documentID - 1);
        }
        documentText.value = response.value[selectedTab.value]?.fullText || '';
    } else {
        response.value.splice(documentID, 1);
        selectedTab.value = 0;
        documentText.value = '';
    }
    console.log("delete");
    console.table(response.value);
}

function saveDocument(documentID: number) {
    alert("save");
}

async function getDocuments() {
    try {
        const responseData = await axios.get(import.meta.env.VITE_API_BASE_URL + '/documents', {
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
            }
        });
        response.value = responseData.data.documents;
        handleClick(selectedTab.value);
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

async function getDocumentDetails(documentID: number) {
    try {
        const responseData = await axios.post(import.meta.env.VITE_API_BASE_URL + '/document-details',
            {
                id: documentID
            },
            {
                headers: {
                    'api-key': import.meta.env.VITE_API_KEY,
                }
            });
        return responseData.data.document[0].text;
        handleClick(selectedTab.value);
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
            <Textarea style="height: 90%" :modelValue="documentText" />
            <br>
            <div style="display: flex; gap: 10px;">
                <Button style="background-color: red; color: white;" @click="deleteDocument(selectedTab)">Izbriši
                    dokument</Button>
                <Button @click="saveDocument(selectedTab)">Spremi Izmjene</Button>
            </div>
        </CardContent>
    </Card>
</template>