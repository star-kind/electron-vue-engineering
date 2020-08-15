<template>
    <el-container>
        <el-header class="header_div_">
            <router-link to="landing-page" class="back_home">
                主页
            </router-link>
            <!--  -->
            <router-link to="Privately" class="back_home" id="mine_profile_link">
                返回个人资料
            </router-link>
        </el-header>
        <!--  -->
        <el-main class="elem_main">
            <div class="m_div_">
                <h4> 修改密码 </h4>
            </div>
            <!--  -->
            <div class="mine_div_alter_">
                <!--  -->
                <el-row justify="center" type="flex" class="row_wrap_form">
                    <el-form :model="passWords" :rules="rulePassWords" ref="referOfForm" label-width="100px" class="_rule_form" style="width: 60%;">
                        <!--  -->
                        <el-form-item label="原密码" prop="oldPassword" class="item_wraped_form">
                            <el-col :span="spanOfWidth" class="column_wraped_form">
                                <el-input v-model="passWords.oldPassword" class="input_data_" placeholder="请输入原密码" maxlength="16" show-password type="password">
                                    <!--  -->
                                    <template slot="prepend">
                                        <i class="el-icon-s-cooperation
"></i>
                                    </template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <!--  -->
                        <!--  -->
                        <el-form-item label="新密码" prop="newPassword" class="item_wraped_form">
                            <el-col :span="spanOfWidth" class="column_wraped_form">
                                <el-input v-model="passWords.newPassword" class="input_data_" placeholder="请输入新密码" maxlength="16" show-password type="password">
                                    <!--  -->
                                    <template slot="prepend">
                                        <i class="el-icon-s-cooperation
"></i>
                                    </template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <!--  -->
                        <el-form-item label="再次输入新密码" prop="reNewPassword" class="item_wraped_form">
                            <el-col :span="spanOfWidth" class="column_wraped_form">
                                <el-input v-model="passWords.reNewPassword" class="input_data_" placeholder="请再次输入新密码" maxlength="16" show-password type="password">
                                    <!--  -->
                                    <template slot="prepend">
                                        <i class="el-icon-s-cooperation
"></i>
                                    </template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <!-- button -->
                        <el-form-item class="mine_btn_item">
                            <el-button type="primary" class="i_submit_btn mine_btn" @click="submitForm('referOfForm')"> 提交
                                <!--  -->
                                <template slot="prepend">
                                    <i class="el-icon-sunset"></i>
                                </template>
                            </el-button>
                            <!--  -->
                            <el-button @click="resetForm('referOfForm')" class="i_reset_btn mine_btn"> 重置
                                <!--  -->
                                <template slot="prepend">
                                    <i class="el-icon-refresh"></i>
                                </template>
                            </el-button>
                        </el-form-item>
                        <!--  -->
                    </el-form>
                </el-row>
                <!--  -->
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { UserService2 } from '@/utils/sqlite/service/UserService2';
export default {
    name: 'AlterPassword',
    data() {
        const validateReNewPassword = (rule, value, callback) => {
            console.log('value= ' + value);
            if (value !== this.passWords.newPassword) {
                let e = new Error('两次输入之新密码不一致!');
                callback(e)
            } else {
                callback()
            }
        };
        //
        return {
            userId: sessionStorage.getItem("id"),
            spanOfWidth: 18,
            passWords: {
                oldPassword: '',
                newPassword: '',
                reNewPassword: '',
            },
            rulePassWords: {
                oldPassword: [{
                        required: true,
                        message: "请输入原密码",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 16,
                        message: "长度在 3 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                newPassword: [{
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 16,
                        message: "长度在 3 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                reNewPassword: [{
                        required: true,
                        message: "第二次输入新密码不正确!请再次输入新密码",
                        trigger: "blur",
                        validator: validateReNewPassword
                    },
                    {
                        min: 3,
                        max: 16,
                        message: "长度在 3 到 16 个字符",
                        trigger: "blur"
                    }
                ]
            },
        }
    },
    methods: {
        submitForm(event) {
            var checkSubmitts = true;
            var userService = new UserService2();
            var service = userService.constructor.prototype;

            this.$refs.referOfForm.validate((valid) => {
                if (!valid) {
                    console.log('error submit!= ' + valid);
                    checkSubmitts = valid;
                } else {
                    console.log('correct submit.');
                }
            });
            if (checkSubmitts == false) {
                console.log('checkSubmitts= ' + checkSubmitts);
                return;
            }
            console.dir(this.passWords);

            var res = service.alterPassWordService(this.passWords.oldPassword, this.passWords.newPassword, this.userId);
            console.dir(res);

            res.then(response => {
                    console.log(response);
                    if (response.code == 200) {
                        var mine = this;

                        this.$notify({
                            title: 'Noitfy',
                            message: response.msg + ',即将转入登录页面,请做好准备',
                            duration: 4000
                        });

                        setTimeout(() => {
                            mine.$router.push({ path: '/Login' });
                        }, 7 * 1000);
                    } else {
                        this.$alert(response.msg, {
                            type: 'warning',
                            confirmButtonText: 'OK'
                        });
                    }
                })
                .catch(err => {
                    console.error(err)
                });
        },
        resetForm(event) {
            this.$refs[event].resetFields();
        },
    },
    mounted() {
        console.log('挂载完毕....')
        console.log(this)
    },
    updated() {
        console.log('变更完毕....')
        console.log(this)
    },
}
</script>
<style scoped="AlterPassword.vue">
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

.alter_btn {
    transform: translate(135%, 0px);
}
</style>