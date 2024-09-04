import { getHotAPI } from '@/apis/home'
import { getNewAPI } from '@/apis/home'
import { getGoodsAPI } from '@/apis/home'

import { ref } from 'vue'

const List = ref([])

export const getList = async (title) => {
    switch (title) {
        case 'new': {
            const res = await getNewAPI()
            List.value = res.result
            return List
        }
        case 'like': {
            const res = await getGoodsAPI()
            List.value = res.result.items
            return List
        }
        case 'hot': {
            const res = await getHotAPI()
            List.value = res.result
            return List
        }
    }
}
