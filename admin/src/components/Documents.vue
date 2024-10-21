<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

defineProps({
    text: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <Card class="p-2">
        <h1>{{ text }}</h1>
    </Card>
    <div style="height: 10px;"></div>
</template>
