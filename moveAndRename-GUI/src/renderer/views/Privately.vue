<template>
    <el-container>
        <el-header class="header_div_">
            <router-link to="landing-page" class="back_home">
                主页
            </router-link>
            <!--  -->
            <router-link to="/" class="back_home" id="change_password_link">
                修改密码
            </router-link>
        </el-header>
        <!--  -->
        <el-main class="elem_main">
            <el-row class="m_div_">
                <p>{{sentence}}</p>
            </el-row>
            <el-row class="row_bg" justify="center" type="flex">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-rule-form" style="width: 60%;">
                    <!-- id -->
                    <el-form-item label="用户id" prop="id" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.id" prefix-icon="el-icon-user" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <!-- 名字 -->
                    <el-form-item label="用户名字" prop="username" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.username" maxlength="30" :disabled="ableStatus">
                                <!--  -->
                                <template slot="prepend">
                                    <i class="el-icon-user"></i>
                                </template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <!-- 电话号 -->
                    <el-form-item label="电话号码" prop="phone" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input :disabled="ableStatus" v-model="ruleForm.phone" maxlength="30">
                                <!--  -->
                                <template slot="prepend">
                                    <i class="el-icon-user"></i>
                                </template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <!-- 邮箱 -->
                    <el-form-item label="邮箱地址" prop="email" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.email" :disabled="ableStatus" maxlength="30">
                                <!--  -->
                                <template slot="prepend">
                                    <i class="el-icon-user"></i>
                                </template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <!--  -->
                    <el-form-item v-if="revampDataBtn">
                        <el-button type="primary" class="mine_submit_btn" id="alter_information" @click="alterInformation()"> 修改资料
                            <!--  -->
                            <template slot="prepend">
                                <i class="el-icon-edit"></i>
                            </template>
                        </el-button>
                    </el-form-item>
                    <!-- button -->
                    <el-form-item v-if="submitFormBtns">
                        <el-button type="primary" class="mine_submit_btn" @click="submitForm('ruleForm')"> 提交
                            <!--  -->
                            <template slot="prepend">
                                <i class="el-icon-setting"></i>
                            </template>
                        </el-button>
                        <!--  -->
                        <el-button @click="resetForm('ruleForm')">重置
                            <!--  -->
                            <template slot="prepend">
                                <i class="el-icon-refresh"></i>
                            </template>
                        </el-button>
                    </el-form-item>
                </el-form>
                <!--  -->
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
import { UserService2 } from '@/utils/sqlite/service/UserService2';
export default {
    name: 'Privately',
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
        const validatePhone = (rule, value, callback) => {
            //例如:13774157471
            var phoneExp = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
            let exp = new RegExp(phoneExp);

            if (exp.test(value) == false) {
                callback(new Error("请输入正确的电话号码"));
            } else {
                callback();
            }
        };
        const validateUsername = (rule, value, callback) => {
            //中文、英文、数字但不包括下划线等符号
            let nameExp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
            let regExpObj = new RegExp(nameExp);
            if (regExpObj.test(value) == false) {
                callback(new Error("输入的名字不符合规范,正确的规范为:中文、英文、数字但不包括下划线等符号."));
            } else {
                callback()
            }
        };
        /* return */
        return {
            sentence: '个人资料',
            spanWidth: 19,
            ableStatus: true,
            revampDataBtn: true,
            submitFormBtns: false,
            ruleForm: {
                id: null,
                username: "",
                email: "",
                phone: ""
            },
            rules: {
                phone: [{
                    required: true,
                    message: "请输入正确的电话号码",
                    trigger: "blur",
                    validator: validatePhone
                }],
                email: [{
                    required: true,
                    message: "请输入正确的邮箱地址",
                    trigger: "blur",
                    validator: validateEmail
                }],
                username: [{
                        required: true,
                        message: "请输入正确的名字",
                        trigger: "blur",
                        validator: validateUsername
                    },
                    {
                        min: 3,
                        max: 30,
                        message: "长度在 3 到 30 个字符",
                        trigger: "blur"
                    }
                ]
            },
        }
    },
    methods: {
        submitForm(event) {
            var userService = new UserService2();
            var service = userService.constructor.prototype;

            this.$refs.ruleForm.validate((valid) => {
                if (!valid) {
                    console.log('error submit!');
                    return false;
                } else {
                    console.log('correct submit.');
                }
            });
            console.dir(this.ruleForm);

            var res = service.updateUserData(this.ruleForm);
            console.dir(res);

            if (res.code == 200) {
                // 存入session
                let userData = res.data;
                let mine = this;
                userData.then(v => {
                        sessionStorage.setItem("username", v.username);
                        sessionStorage.setItem("phone", v.phone);
                        sessionStorage.setItem("email", v.email);
                        sessionStorage.setItem("id", v.id);

                        this.ableStatus = true;
                        this.submitFormBtns = false;
                        this.revampDataBtn = true;

                        mine.$notify({
                            title: 'Noitfy',
                            message: '资料修改成功',
                            duration: 4000
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } else {
                this.$alert('修改未成功,请通知技术人员处理', {
                    type: 'warning',
                    confirmButtonText: 'OK'
                })
            }
        },
        initialForm() {
            var mineData = {};
            mineData.username = sessionStorage.getItem("username");
            mineData.phone = sessionStorage.getItem("phone", );
            mineData.email = sessionStorage.getItem("email");
            mineData.id = sessionStorage.getItem("id");
            console.dir(mineData);
            if (mineData != null || '' || undefined) {
                this.ruleForm = mineData;
            }
        },
        /* reset */
        resetForm(refItemName) {
            this.$refs[refItemName].resetFields();
        },
        alterInformation() {
            this.ableStatus = false;
            this.submitFormBtns = true;
            this.revampDataBtn = false;
        },
    },
    mounted() {
        console.log('......挂载完成...');
        this.initialForm();
    },
    updated() {
        console.log('......更新完成...');
        console.dir(this);
    }
}
</script>
<style scoped="Privately.vue">
.back_home {
    color: #ffffff;
    text-decoration-line: none;
    margin: 0 27px;
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

button {
    transform: translate(150%, 0px);
}

#alter_information {
    transform: translate(135%, 0px);
}
</style>