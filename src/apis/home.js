import request from '@/utils/http'


// 获取banner

export function getBannerAPI(params = {}) {
    // 默认为1 商品为2
    const { distributionSite = '1' } = params
    return request({
        url: '/home/banner',
        params: {
            distributionSite
        }
    })
}

// 获取新鲜好物

export const getNewAPI = () => {
    return request({
        url: '/home/new',
        params:{
            limit:16
        }
    })
}

// 获取人气推荐

export const getHotAPI = () => {
    return request({
        url: '/home/hot',
        params:{
            limit:8
        }
    })
}

// 获取猜你喜欢商品模块

export const getGoodsAPI = () => {
    return request({
        url: '/home/goods/guessLike',
        params:{
            limit:8
        }
    })
}
