<script setup>
defineProps({
    goods: {
        type: Object,
        default: () => { }
    }
})
</script>
<template>
    <RouterLink :to="`/detail/${goods.id}`" class="goods-item">
        <!-- <img v-img-lazy="goods.picture" alt=""> -->
        <img v-img-lazy="goods.picture" alt="">
        <p class="name ellipsis">{{ goods.name }}</p>
        <p class="desc ellipsis">{{ goods.desc }}</p>
        <p class="price">&yen;{{ goods.price }}</p>
    </RouterLink>
</template>

<style scoped lang="scss">
.goods-item {

    img {
        width: 90%;
        height: 70%;
    }

    p {
        padding-top: 10px;
    }

    .name {
        font-size: 16px;
    }

    .desc {
        color: #999;
        height: 29px;
    }

    .price {
        color: $priceColor;
        font-size: 20px;
    }
}
</style>
