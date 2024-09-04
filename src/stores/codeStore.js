import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CodeAPI } from '@/apis/code'

export const useCodeStore = defineStore('code', () => {
    const code = ref({})
    const getCode = async ({ zone,mobile}) => {
        const res = await CodeAPI({ zone, mobile})
        code.value = res.result
        console.log(res)
    }
    return {
        code,
        getCode
    }
})
