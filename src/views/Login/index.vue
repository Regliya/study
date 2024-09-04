<script setup>
//模板
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

import { form, rules } from './apis/rules'
import { phoneList } from './apis/PhoneList'

import { useUserStore } from '@/stores/userStore'
import { useCodeStore } from '@/stores/codeStore'


const userStore = useUserStore()
const codeStore = useCodeStore()

const UseMessage = ref("pw")
const Switch = (value) => {
    UseMessage.value = value
}




// 3. 获取form实例做统一校验
const formRef = ref(null)
const router = useRouter()

const isCounting = ref(false)
const countdown = ref(61)

const getCode = () => {
    const { zone, mobile } = form.value
    formRef.value.validate(async (valid) => {
        console.log(valid)

        if (valid) {
            console.log(zone + mobile)
            await codeStore.getCode({ zone, mobile })
            isCounting.value = true

            const clearId = setInterval(() => {
                countdown.value--
                if (countdown.value == 0) {
                    clearInterval(clearId.valueOf);
                    countdown.value = 60;
                    isCounting.value = false;
                }
            }, 1000)
        }
    })





}


const doLogin = () => {
    // 调用实例方法
    const { account, password, zone, mobile, code } = form.value
    formRef.value.validate(async (valid) => {
        // valid: 所有表单都通过校验  才为true
        console.log(valid)
        // 以valid做为判断条件 如果通过校验才执行登录逻辑
        if (valid) {
            // TODO LOGIN
            if (UseMessage.value == 'pw')
                await userStore.getUserInfo({ account, password })

            else if (UseMessage.value == 'ms')
                await userStore.getUserCode({ zone, mobile, code })
            // 1. 提示用户
            ElMessage({ type: 'success', message: '登录成功' })
            // 2. 跳转首页
            router.replace({ path: '/' })
        }
    })
}

</script>

<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">小兔鲜</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>

        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户登录</a>
                </nav>

                <div class="left">

                    <div class="switch">
                        <ul>
                            <li>
                                <el-button :class="{ active: UseMessage == 'pw' }"
                                    @click="Switch('pw')">密码登录</el-button>
                            </li>
                            <li>
                                <el-button :class="{ active: UseMessage == 'ms' }"
                                    @click="Switch('ms')">短信登录</el-button>
                            </li>
                        </ul>
                    </div>

                    <div v-if="UseMessage == 'ms'" class="form">
                        <el-form ref="formRef" :model="form" :rules="rules" status-icon>
                            <el-form-item prop="mobile">
                                <el-input v-model="form.mobile" placeholder="手机号">
                                    <template #prepend>
                                        <el-select v-model="form.zone" :placeholder="'+86'" style="width: 65px">
                                            <el-option v-for="item in phoneList" :key="item.value" :label="item.label"
                                                :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input v-model="form.code" placeholder="验证码">
                                    <template #suffix>
                                        <el-button class="code" :disabled="isCounting" @click="getCode">{{ countdown == 61 ? "发送验证码" :
                                            `(${countdown})后重发验证码` }}</el-button>
                                    </template>
                                </el-input>



                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>

                        </el-form>


                        <div class="ShutCut">
                            <ul>
                                <li>
                                    <a href="">免费注册</a>
                                </li>
                            </ul>
                        </div>


                        <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>

                    </div>

                    <div v-else-if="UseMessage == 'pw'" class="form">
                        <el-form ref="formRef" :model="form" :rules="rules" status-icon>
                            <el-form-item prop="account">
                                <el-input v-model="form.account" placeholder="账号/手机号" />
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" show-password v-model="form.password" placeholder="密码" />
                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>

                            <div class="ShutCut">
                                <ul>
                                    <li>
                                        <a href="">免费注册</a>
                                    </li>
                                    <li>
                                        <a href="">忘记账号</a>
                                    </li>
                                    <li>
                                        <a href="">忘记密码</a>
                                    </li>
                                </ul>
                            </div>

                            <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
                        </el-form>



                    </div>



                </div>
                <div class="right">
                    <span>手机扫码安全登录</span>
                    <div class="qrcode"></div>
                </div>
            </div>

        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
                <p>CopyRight &copy; 小兔鲜儿</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang='scss'>
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: $xtxColor;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    background: url('@/assets/images/login-bg.png') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        height: 420px;
        width: 550px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 36px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        border-radius: 8px;

        nav {
            border-radius: 8px 8px 0 0;
            font-size: 14px;
            height: 55px;
            background: rgb(240, 240, 240);
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }

        .left {
            position: relative;
            float: left;
            height: 365px;
            width: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .switch {
                ul {
                    height: 30px;
                    width: 300px;

                    position: absolute;
                    top: 20px;
                    left: 0;

                    display: flex;
                    justify-content: center;

                    li {
                        button {
                            font-size: 18px;
                            font-weight: bold;
                            padding: 0 10px;
                            border: 0;
                            border-radius: 0;
                            border-left: 1px solid $xtxColor;
                        }

                        :hover {
                            background: none;
                        }
                    }

                    li:first-child {
                        button {
                            border-left: 0;
                        }
                    }


                    .active {
                        color: $xtxColor;
                    }


                }

            }

            .form {
                width: 300px;
                padding: 20px;
                border-right: 1px solid #666;

                .subBtn {
                    background: $xtxColor;
                    width: 100%;
                    color: #fff;
                }

                .code {
                    height: 10px;
                    border: 0;

                    &:hover {
                        background: none;
                    }

                }
            }

            .ShutCut {
                ul {
                    height: 30px;
                    width: 100%;

                    display: flex;
                    justify-content: center;



                    li {
                        a {
                            color: #666;
                            font-weight: bold;
                            padding: 0 10px;
                            border: 0;
                            border-radius: 0;
                            border-left: 1px solid #666;
                        }

                        :hover {
                            background: none;
                        }
                    }

                    li:first-child {
                        a {
                            border-left: 0;
                        }
                    }


                    .active {
                        color: $xtxColor;
                    }


                }

            }

        }

        .right {

            float: right;
            height: 365px;
            width: 250px;

            display: flex;
            flex-direction: column;
            align-items: center;


            span {
                margin-top: 10px;
                font-size: 20px;
                font-weight: 900;
                height: 55px;
                display: flex;
                padding: 0 40px;
                text-align: right;
                align-items: center;

            }

            .qrcode {
                width: 200px;
                height: 200px;
                background: url('@/assets/images/qrcode.jpg') no-repeat center / cover;
            }
        }
    }


}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}
</style>
