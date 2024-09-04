<script setup>
import { onMounted, ref } from 'vue';
import { getList } from './api/goodList';
import GoodsItem from './pannel/GoodsItem.vue';


const List = ref({})


onMounted(async () => {
    const res = await getList("new")
    List.value = res.value
    console.log(List.value)

})


const UsePannel = ref("new")

const Switch = async (value) => {
    console.log(UsePannel.value)
    UsePannel.value = value

    const res = await getList(UsePannel.value)
    List.value = res.value
    console.log(List.value)
}

</script>

<template>
    <div class="Switch">
        <ul>
            <li>
                <el-button @click="Switch('new')">
                    <i :class="{ active: UsePannel == 'new' }">新鲜好物</i>
                </el-button>
            </li>
            <li>
                <el-button @click="Switch('like')">
                    <i :class="{ active: UsePannel == 'like' }">猜你喜欢</i>
                </el-button>
            </li>
            <li>
                <el-button @click="Switch('hot')">
                    <i :class="{ active: UsePannel == 'hot' }">人气推荐</i>
                </el-button>
            </li>


        </ul>
    </div>

    <div class="List">
        <ul class="goods-list">
            <li v-for="item in List" :key="item.id">
                <GoodsItem class="goods-item" :goods="item"></GoodsItem>
            </li>
        </ul>
    </div>

</template>

<style lang="scss" scoped>
.Switch {
    margin: 20px auto;

    ul {
        display: flex;

        li {
            display: flex;
            padding: 10px 0;

            .el-button {
                font-size: 36px;
                height: 90px;
                width: 415px;
                border: 0;
                border-radius: 0;



            }

            ~li {
                .el-button {
                    border-left: 1px solid $xtxColor;
                }

            }

            .active {
                color: $xtxColor;
                padding-bottom: 10px;
                border-bottom: 1px solid $xtxColor;
            }
        }
    }



}


.goods-list {

    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;

    li {
        width: 306px;
        height: 406px;
        
        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }
    }
}
</style>
