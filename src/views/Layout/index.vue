<script setup>
import LayoutNar from '@/views/Layout/components/LayoutNar.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFixed from '@/views/Layout/components/pannel/LayoutFixed.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue';


import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
    categoryStore.getCategory()
})

</script>

<template>
    <LayoutNar></LayoutNar>
    <LayoutHeader></LayoutHeader>
    <LayoutFixed></LayoutFixed>
    <RouterView />
    <LayoutFooter></LayoutFooter>
</template>

<style lang="scss" scoped></style>
