<script setup>
    const props = defineProps({
        header:{
            type: String
        },
        totalCounted:{
            type: Number
        }
    })
</script>

<template>
    <div class="shadow-xl py-8 px-4 rounded-lg">
        <p class="text-center mb-6 text-xl uppercase font-semibold">{{props.header}}</p>

        <div class="flex items-center justify-center gap-4">
            <slot></slot>
            <p class="text-3xl font-bold">{{props.totalCounted}}</p>
        </div>
    </div>
</template>