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

const mode = useColorMode();
mode.value = 'dark';

const response = ref([
    {
        "name": "Prvo",
        "fullText": "Ovo je prvo zannje",
        "id": 1
    },
    {
        "name": "Drugo",
        "fullText": "Ovo je drugo zannje",
        "id": 2
    },
    {
        "name": "Treće",
        "fullText": "Ovo je treće zannje",
        "id": 3
    }
]);

const selectedTab = ref(0);
const documentText = ref('');

function handleClick(documentID) {
    console.log("Clicked Document ID:", documentID);
    selectedTab.value = documentID;
    documentText.value = response.value[documentID].fullText;
    console.log(selectedTab.value);
    console.table(response.value);
}

function deleteDocument(documentID) {
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

function saveDocument(documentID) {
    alert("save");
}

onMounted(() => {
    handleClick(selectedTab.value);
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