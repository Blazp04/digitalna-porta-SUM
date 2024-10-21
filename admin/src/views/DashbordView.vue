<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useColorMode } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Documents from '@/components/Documents.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

const mode = useColorMode()
mode.value = 'dark'

const apiKey = ref<string>('');

const response = [
    {
        "text": "Djuro neko znanje",
        "fullText": "Djuro neko znanje",
        "id": 1
    },
    {
        "text": "Djuro a znanje",
        "fullText": "Djuro neko znanje",
        "id": 2
    },
    {
        "text": "Djuro s znanje",
        "fullText": "Djuro neko znanje",
        "id": 3
    }
]

</script>

<template>
    <div style="position: fixed; left: 10px; top: 20px; bottom: 10px; width: 300px; ">
        <Card style="height: calc(100% - 20px)" class="border-2">
            <CardHeader>
                <CardTitle>Djuro Znanje</CardTitle>
            </CardHeader>
            <CardContent style="overflow-y: auto; height: 100%">
                <Documents v-for="responseItem in response" :text="responseItem.text" />
            </CardContent>
        </Card>
    </div>
    <Card style="position: fixed; left: 350px; top: 20px; right: 20px; bottom: 30px; " class="border-2">
        <CardHeader>
            <CardTitle>Djuro pregled znanja</CardTitle>
        </CardHeader>
        <CardContent style="height: 90%">
            <Textarea style="height: 90%" />
        </CardContent>

    </Card>
</template>
