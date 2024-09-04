// 1. 准备表单对象
import { ref } from 'vue'

export const form = ref({
    // account: '18610848230',
    // password: '123456',
    // agree: true
    account: '13888888888',
    password: '123456',
    zone:'+86',
    mobile:'',
    code:'',
    agree: true
})

// 2. 准备规则对象
export const rules = {
    account: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
    ],
    mobile:[
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { min: 11,max:11, message: '手机号长度为11位', trigger: 'blur' },
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                console.log(value)
                // 自定义校验逻辑
                // 勾选就通过 不勾选就不通过
                if (value) {
                    callback()
                } else {
                    callback(new Error('请勾选协议'))
                }
            }
        }
    ]
}
