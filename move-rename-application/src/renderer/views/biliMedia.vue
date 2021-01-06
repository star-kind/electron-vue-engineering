<template>
    <el-container>
        <el-header id="header_div_back">
            <div class="back_a_ title_facade">
                <router-link to="landing-page" id="back_to_home"> 返回主页 </router-link>
            </div>
        </el-header>
        <!--  -->
        <el-main class="ele_main">
            <div class="_tip_h_three">
                <h3>操作前最好请对源文件进行备份</h3>
            </div>
            <div class="toggle_div_">
                <el-form :model="dirPaths" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="视频缓存所处目录路径" prop="srcPath" class="_input_item">
                        <el-input placeholder="请输入视频缓存所处目录路径" prefix-icon="el-icon-search" v-model="dirPaths.srcPath" size="medium">
                        </el-input>
                    </el-form-item>
                    <!--  -->
                    <el-form-item label="目的地目录路径" prop="targetPath" class="_input_item">
                        <el-input placeholder="请输入目的地目录路径" prefix-icon="el-icon-search" v-model="dirPaths.targetPath" id="own_input_ele">
                        </el-input>
                    </el-form-item>
                    <!--  -->
                    <el-form-item>
                        <el-button type="primary" id="_submit_btn" @click="submitForm('ruleForm')">提交</el-button>
                        <!--  -->
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
                <!--  -->
            </div>
        </el-main>
    </el-container>
</template>
<script type="text/javascript">
import { blvService } from '@/utils/bilibiliUtils/bilibiliService';

export default {
    name: 'biliMedia',
    data() {
        return {
            dirPaths: {
                srcPath: '',
                targetPath: '',
            },
            rules: {
                srcPath: [{ required: true, message: "请输入视频缓存所处目录路径", trigger: "blur" }],
                targetPath: [{ required: true, message: "请输入目的地目录路径", trigger: "blur" }],
            },
            resp: Object,
        }
    },
    methods: {
        submitForm(refItemName) {
            let flag = true;
            var mine = this;
            var pathData = mine.dirPaths;

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
            console.log(pathData);

            try {
                this.resp = blvService(pathData);
            } catch (error) {
                console.error(error);
                this.$notify.error({
                    title: '错误',
                    message: error.msg
                });
                return;
            }

            this.$notify({
                title: '操作成功',
                message: '已成功将 ' + this.resp.data + ' 个文件进行改名及移动至目的地目录',
                type: 'success'
            });
        },
        /* reset */
        resetForm(refItemName) {
            this.$refs[refItemName].resetFields();
        }
    },
    mounted() {
        console.info(this)
        console.info('...挂载完成...')
    },
}
</script>
<style type="text/css" scoped="biliMedia.vue">
form>input {
    width: 300px;
}

._tip_h_three {
    text-align: center;
    margin: 20px 0;
}

#header_div_back {
    margin: 2em 0 0 0;
    text-align: center;
    height: 60px;
    padding: 20px 0 0px 0;
    background-color: #4f94ea;
}

#back_to_home {
    color: #ffffff;
    text-decoration-line: none;
}

.el-input {
    font-size: 26px;
}
</style>