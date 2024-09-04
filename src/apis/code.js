import request from '@/utils/http'

export const CodeAPI = ({zone , mobile}) => {
    console.log(mobile)
    return request({
        url: '/login/code',
        params: {
            mobile
        }
    })
}
