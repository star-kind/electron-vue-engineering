<template>
    <el-container>
        <el-header>
            <div class="__back_home title_facade">
                <router-link to="landing-page" style="color: white;text-decoration: none;">返回主页</router-link>
            </div>
        </el-header>
        <!--  -->
        <el-main id="ele_main">
            <el-row class="row_bg" justify="center" type="flex">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 60%;">
                    <!-- 名字 -->
                    <el-form-item label="请输入名字" prop="username" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.username" maxlength="30"></el-input>
                        </el-col>
                    </el-form-item>
                    <!-- 电话号 -->
                    <el-form-item label="请输入电话号" prop="phone" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.phone" maxlength="30"></el-input>
                        </el-col>
                    </el-form-item>
                    <!-- 邮箱 -->
                    <el-form-item label="请输入邮箱地址" prop="email" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.email" maxlength="30"></el-input>
                        </el-col>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="请输入密码" prop="password" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.password" show-password maxlength="16"></el-input>
                        </el-col>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="请再次输入密码" prop="rePassword" class="mine_input_item">
                        <el-col :span="spanWidth">
                            <el-input v-model="ruleForm.rePassword" show-password maxlength="16"></el-input>
                        </el-col>
                    </el-form-item>
                    <!-- button -->
                    <el-form-item>
                        <el-button type="primary" id="mine_submit_btn" @click="submitForm('ruleForm')">提交</el-button>
                        <!--  -->
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
                <!--  -->
            </el-row>
        </el-main>
        <!--  -->
    </el-container>
</template>
<script type="text/javascript">
import { UserService2 } from '@/utils/sqlite/service/UserService2';

export default {
    name: "Register",
    data() {
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
        const validateRePassword = (rule, value, callback) => {
            if (this.ruleForm.password != this.ruleForm.rePassword) {
                callback(new Error("密码错误,两次输入的密码不一致"));
            } else {
                callback();
            }
        };
        /* return */
        return {
            spanWidth: 14,
            ruleForm: {
                rePassword: "",
                username: "",
                password: "",
                email: "@qq.com",
                phone: "13994377479"
            },
            rules: {
                password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                        validator: validateRePassword
                    },
                    {
                        min: 3,
                        max: 16,
                        message: "长度在 3 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                rePassword: [{
                        required: true,
                        message: "密码错误,两次输入的密码不一致,请再次输入密码",
                        trigger: "blur",
                        validator: validateRePassword
                    },
                    {
                        min: 3,
                        max: 16,
                        message: "长度在 3 到 16 个字符",
                        trigger: "blur"
                    }
                ],
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
                        message: "请输入名字",
                        trigger: "blur",
                        validator: validateUsername
                    },
                    {
                        min: 3,
                        max: 30,
                        message: "长度在 3 到 30 个字符",
                        trigger: "blur"
                    },
                ]
            }
        };
    },
    methods: {
        submitForm(refItemName) {
            var userService = new UserService2();
            var serv = userService.constructor.prototype;

            let flag = true;
            var mine = this;
            // var account = mine.ruleForm;

            this.$refs[refItemName].validate(valid => {
                if (valid) {
                    console.info('Success"s validate,vaild=>' + valid);
                } else {
                    console.info('Defeat"s validate,vaild==>' + valid);
                    flag = valid;
                }
            });

            if (flag == false) {
                return;
            }
            console.log(this.ruleForm);

            var res = serv.register(this.ruleForm);
            console.dir(res);
            if (res.code === 200) {
                this.$notify({
                    title: "notify",
                    message: res.data + "名新用户注册成功,三秒后关闭通知",
                    duration: 3000
                });

                setTimeout(function() {
                    mine.$router.push("landing-page");
                }, 1000 * 6);
            } else {
                this.$alert(res.msg, "错误", {
                    confirmButtonText: "确定"
                });
            }
            // this.$axios({
            //     method: "post",
            //     url: "/api/users/userAdd",
            //     data: account,
            //     // `transformRequest` 允许在向服务器发送前，修改请求数据
            //     transformRequest: [
            //       function(data) {
            //         return JSON.stringify(data);
            //       }
            //     ],
            //     headers: {
            //       "Content-Type": "application/json;charset=UTF-8"
            //     }
            //   })
            //   .then(function(response) {
            //     console.log(response);
            //     if (response.data.status == 200) {
            //       mine.$notify({
            //         title: "notify",
            //         message: "注册成功,三秒后关闭通知",
            //         duration: 3000
            //       });

            //       mine.$router.push("/bilibiliVideo");
            //     } else {
            //       mine.$alert(response.data.msg, "错误", {
            //         confirmButtonText: "确定"
            //       });
            //     }
            //   })
            //   .catch(function(error) {
            //     console.log(error);
            //   });
        },
        /* reset */
        resetForm(refItemName) {
            this.$refs[refItemName].resetFields();
        }
    },
    mounted() {
        console.info(this);
    }
};
</script>
<style type="text/css" scoped="Register.vue">
.title_facade {
    text-align: center;
}

#mine_code_btn {
    transform: translateX(25px);
}

body {
    overflow: auto;
}

.mine_input_item {
    width: 98%;
}

#mine_submit_btn {
    color: rgb(255, 255, 255);
    border-color: rgb(64, 158, 255);
    background-color: rgb(64, 158, 255);
}

.el-header,
.el-footer {
    background-color: #66b1ff;
    color: #fbfbfb;
    text-align: right;
    line-height: 60px;
}

.el-link {
    font-size: 18px;
}

.el-link.el-link--default {
    color: #fffdfd;
}

.el-form-item__label,
.el-form-item__error {
    color: #e25f5f;
}

#ele_main {
    margin: 2em 0 0 0;
}

.el-form-item {
    margin: 18px 0 0 0;
}
</style>