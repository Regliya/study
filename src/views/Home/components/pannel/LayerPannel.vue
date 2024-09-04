<script setup>

defineProps({
    item: {}
})
</script>

<template>
    <div class="pannel">

        <RouterLink to="/">

            <img :src="item.picture" alt="" />

            <div class="info">
                <p class="name ellipsis-2">
                    {{ item.name }}
                </p>
                <p class="desc ellipsis">{{ item.desc }}</p>
                <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>


        </RouterLink>

    </div>
</template>



<style lang="scss" scoped>
.pannel {
    // background: pink;
    a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;

        &:hover {
            background: $xtxColor;
        }

        img {
            width: 95px;
            height: 95px;
        }

        .info {
            padding-left: 10px;
            line-height: 24px;
            overflow: hidden;

            .name {
                font-size: 16px;
                color: #666;
            }

            .desc {
                color: #999;
            }

            .price {
                font-size: 22px;
                color: $priceColor;

                i {
                    font-size: 16px;
                }
            }
        }
    }

}

// img {
//         width: 95px;
//         height: 95px;
//     }

// .info {
//     padding-left: 10px;
//     line-height: 24px;
//     overflow: hidden;



//     .name {
//         font-size: 16px;
//         color: #666;
//     }

//     .desc {
//         color: #999;
//     }

//     .price {
//         font-size: 22px;
//         color: $priceColor;

//         i {
//             font-size: 16px;
//         }
//     }
// }
</style>
