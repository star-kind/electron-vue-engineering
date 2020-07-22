<template>
    <el-container>
        <el-header class="header_div_">
            <router-link to="landing-page" class="back_home">
                主页
            </router-link>
        </el-header>
        <!--  -->
        <el-main>
            <div class="m_div_">
                <h4>{{sentence}}</h4>
            </div>
            <!--  -->
            <el-form :model="ruleForm2Login" :rules="ruleForm2" status-icon ref="ruleForm2Login" label-position="left" label-width="0px" class="demo-ruleFrom login-page" id="loging_user">
                <!--  -->
                <el-form-item prop="email">
                    <el-input type="text" v-model="ruleForm2Login.email" auto-comlete="off" placeholder="请输入邮箱" maxlength="80">
                        <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px"></span></template>
                    </el-input>
                </el-form-item>
                <!--  -->
                <el-form-item prop="password">
                    <el-input :type="pwdType" v-model="ruleForm2Login.password" auto-comlete="off" placeholder="请输入密码" @input="handlerEnterPass" @keyup.enter.native="handleSubmit" maxlength="16">
                        <!--  -->
                        <template slot="prepend">
                            <span class="fa fa-lock fa-lg" style="width: 13px"></span>
                        </template>
                        <template slot="suffix">
                            <span id="pwd_span" class="password-eye" @click="showPassword" :class="eyeType"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-checkbox v-model="rememberMe" class="rememberMe">记住密码</el-checkbox>
                <!--  -->
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" :disabled="isNotValidBrowser" @click="handleSubmit" :loading="logining"> 登录 </el-button>
                </el-form-item>
                <!--  -->
            </el-form>
        </el-main>
        <!--  -->
    </el-container>
</template>
<script type="text/javascript">
import { UserService2 } from '@/utils/sqlite/service/UserService2';

export default {
    name: 'Login',
    created() {
        console.info('...created......')
        if (!window.Promise) {
            this.isNotValidBrowser = true
            this.$notify({
                title: "Notify",
                message: '浏览器版本过低，无法登陆，建议使用最新版谷歌',
                duration: 13000
            });
        }
    },
    data() {
        const validateEmail = (rule, value, callback) => {
            var mailExp = /\w+([-+.']\w+)*@\w+([-.]w+)*\.\w+([-.]\w+)*/;
            let exp = new RegExp(mailExp);

            if (exp.test(value) == false) {
                callback(new Error("请输入正确的邮箱地址"));
            } else {
                callback();
            }
        };
        return {
            logining: false,
            pwdType: 'password',
            redirect: undefined,
            hidePassword: '',
            isNotValidBrowser: false,
            sentence: "用户登录",
            rememberMe: false,
            pwdEyeShow: false,
            eyeType: 'fa fa-eye-slash fa-lg',
            ruleForm2Login: {
                email: '',
                password: '',
            },
            ruleForm2: {
                email: [{ required: true, message: 'please enter your email', trigger: 'blur', validator: validateEmail }],
                password: [{ required: true, message: 'please enter your password', trigger: 'blur' },
                    { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
                ]
            },
        }
    },
    methods: {
        showPassword() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
                this.eyeType = 'fa fa-eye fa-lg'
            } else {
                this.pwdType = 'password'
                this.eyeType = 'fa fa-eye-slash fa-lg'
            }
        },
        /**/
        handleSubmit(event) {
            var userService = new UserService2();
            var serv = userService.constructor.prototype;

            this.$refs.ruleForm2Login.validate((valid) => {
                if (!valid) {
                    console.log('error"s submit!= ' + valid);
                    return false;
                }
            })
            this.logining = true;
            /**/
            serv.userLogin(this.ruleForm2Login.email, this.ruleForm2Login.password).then(res => {
                console.dir(res);
                if (res.code == 200) {
                    let mine = this;
                    this.logining = false;
                    if (this.rememberMe) {
                        this.setCookie(this.ruleForm2Login.email, this.ruleForm2Login.password, 7);
                    } else {
                        this.clearCookie();
                    }
                    // 存入session
                    let userData = res.data[0];
                    sessionStorage.setItem("username", userData.username);
                    sessionStorage.setItem("phone", userData.phone);
                    sessionStorage.setItem("email", userData.email);
                    sessionStorage.setItem("id", userData.id);

                    this.$notify({
                        title: 'Noitfy',
                        message: '登录成功,即将转入用户界面',
                        duration: 3000
                    });
                    setTimeout(function() {
                        mine.$router.push({ path: '/' })
                    }, 6 * 1000);
                } else {
                    this.$alert(res.msg, {
                        type: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
            }).catch(error => {
                console.error(error);
            })
        },
        /**/
        handlerEnterPass() {
            this.hidePassword = '';
        },
        /**
         * Sets the cookie.
         *
         * @param      {<type>}  name    The name
         * @param      {<type>}  pass    The pass
         * @param      {<type>}  days    The days
         */
        setCookie(name, pass, days) {
            let expire = new Date();
            expire.setDate(expire.getDate() + days)
            document.cookie = `currently-email=${name};expires=${expire}`;
            document.cookie = `currently-password=${pass};expires=${expire}`;
        },
        /**
         * Gets the cookie.
         */
        getCookie() {
            if (document.cookie.length) {
                let arr = document.cookie.split('; ')
                console.log(arr);
                for (let i = 0; i < arr.length; i++) {
                    let arr2 = arr[i].split('=');
                    if (arr2[0] === 'currently-email') {
                        this.ruleForm2Login.email = arr2[1];
                    } else if (arr2[0] === 'currently-password') {
                        this.ruleForm2Login.password = '********';
                        this.hidePassword = arr2[1];
                        this.rememberMe = true;
                    }
                }
            }
        },
        /**/
        clearCookie() {
            this.setCookie('', '', -1)
        },
        /**/
    },
    mounted() {
        console.log('...挂载...');
        this.getCookie();
    },
    updated() {
        console.info('....updated....');
        console.dir(this);
    },
}
</script>
<style type="text/css" scoped="Login.vue">
.back_home {
    color: #ffffff;
    text-decoration-line: none;
}

.m_div_ {
    text-align: center;
}

.header_div_ {
    text-align: center;
    height: 60px;
    padding: 20px 0 0 0;
    background-color: #4f94ea;
}
</style>