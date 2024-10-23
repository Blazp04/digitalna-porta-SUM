<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ref, watch } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    onClick: {
        type: Function,
        required: true,
    },
})

const backgroundColor = ref('')
const textColor = ref('')

// Watcher koji prati promjenu isActive
watch(() => props.isActive, (newValue) => {
    if (newValue) {
        backgroundColor.value = 'white'
        textColor.value = 'black'
    } else {
        backgroundColor.value = 'transparent'
        textColor.value = 'white'
    }
})

if (props.isActive) {
    backgroundColor.value = 'white'
    textColor.value = 'black'
}

function handleClick() {
    props.onClick()
}
</script>

<template>
    <Card class="p-2 cursor-pointer" :style="{ 'background-color': backgroundColor, 'color': textColor }"
        @click="handleClick">
        <h1>{{ text }}</h1>
    </Card>
    <div style="height: 10px;"></div>
</template>