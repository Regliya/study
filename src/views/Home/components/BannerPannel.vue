<script setup>
import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

const bannerList = ref([])

const getBanner = async () => {
    const res = await getBannerAPI()
    console.log(res)
    bannerList.value = res.result
}

onMounted(() => getBanner())

</script>



<template>
    <div class="home-banner">
        <el-carousel class="banner">
            <el-carousel-item class="banner"
            v-for="item in bannerList" :key="item.id" >
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style scoped lang='scss'>
.home-banner {
    width: 1240px;

    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;
    .banner{
        height: 500px;
    }
    img {
        width: 100%;
        // height: 500px;
    }
}
</style>
