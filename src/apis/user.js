// 封装所以和用户相关的接口函数
import request from '@/utils/http'

export const loginAPI = ({ account, password }) => {
    return request({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}



export const loginCode = ({ mobile, code }) => {

    return request({
        url: '/login/code',
        method: 'POST',
        data: {
            mobile,
            code
        }
    })
}

// 获取喜欢列表API
export const getLikeListAPI = ({ limit = 4 }) => {
    return request({
        url: '/goods/relevant',
        params: {
            limit
        }
    })
}
