<script setup>
    import { Button } from '@/components/ui/button';
    import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from '@/components/ui/dialog';

    defineProps({
        itemName:{
            type:String
        },
        itemDescription:{
            type:String
        }
    })
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button class="bg-blue-500 hover:bg-blue-400">Description</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{{ itemName?? 'Item' }}</DialogTitle>
                <DialogDescription>
                    {{ itemDescription?? 'Description' }}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter class="sm:justify-start">
                <DialogClose as-child>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>