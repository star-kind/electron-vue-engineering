<template>
    <el-container>
        <el-header class="header_div_">
            <router-link to="landing-page" class="back_home">
                主页
            </router-link>
        </el-header>
        <!--  -->
        <el-main>
            <div class="main_div_">
                <div id="_tip_h_three">
                    <h3>最好于操作前备份源文件</h3>
                </div>
                <el-form ref="formReferer" :rules="rules" :model="formData" label-width="150px">
                    <!--  -->
                    <el-form-item label="选择源目录" prop="origin">
                        <el-input v-model="formData.origin" type="text"></el-input>
                    </el-form-item>
                    <!--  -->
                    <el-form-item label="选择目的地" prop="destination">
                        <el-input v-model="formData.destination" type="text"></el-input>
                    </el-form-item>
                    <!--  -->
                    <div class="btn_div_">
                        <el-row>
                            <el-button type="primary" @click="submitData('formReferer')">提交</el-button>
                            <el-button type="warning" @click="resetForm('formReferer')">重置</el-button>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </el-main>
        <!--  -->
    </el-container>
</template>
<script type="text/javascript">
const ipcRenderer = require("electron").ipcRenderer;

import { getUrlOfDest } from '@/utils/renameAndMove/getDirectoriesName';
import { getTheFileArray } from '@/utils/renameAndMove/getFilesName';
import { changedTheFileName } from '@/utils/renameAndMove/changeFileName';
import { getTheNewFileName } from '@/utils/renameAndMove/changeFileName';
import { move2Dest } from '@/utils/renameAndMove/move2Dir';

var fs = require('fs')
var join = require('path').join;

export default {
    name: 'RenameAndMoveFile',
    data() {
        return {
            formData: {
                origin: '',
                destination: '',
            },
            rules: {
                origin: [{ required: true, message: '请选择源文件目录', trigger: 'blur' }],
                destination: [{ required: true, message: '请选择目标目录', trigger: 'blur' }],
            },
            arries: {
                destResults: [],
                filesNamesArray: [],
                array1: [],
                theNewNamesArr: [],
                filesNameArr: [],
            },
            count: 0,
            countingMoving: 0,
        }
    },
    methods: {
        /* methods begining */
        submitData(refer) {
            var check = true;
            this.$refs[refer].validate(valid => {
                if (valid) {
                    console.info('success for validate')
                } else {
                    console.info('defeat by validate')
                    check = valid;
                }
            })
            if (!check) {
                return;
            }
            console.info(this.formData);

            this.updateNameAndMove();
        },
        /**/
        updateNameAndMove() {
            try {
                this.getDirRealUrl();
            } catch (err) {
                console.error(err);
                this.$notify.error({
                    title: '错误',
                    message: '无此目录'
                });
                return;
            }

            this.getNameOfDirs();

            try {
                this.revampFileName();
            } catch (err) {
                console.error(err);
                this.$notify.error({
                    title: '错误',
                    message: '新拟定之文件名过长,请取备份文件重新操作'
                });
                return;
            }

            this.movingFiles();

            this.$notify({
                title: '成功',
                message: '已成功将' + this.arries.countingMoving + '个文件重命名及迁移至新目录',
                type: 'success'
            });
        },
        /**/
        resetForm(refer) {
            this.$refs[refer].resetFields();
        },
        /**/
        getDirRealUrl() {
            // 获取文件夹真实URL
            this.arries.destResults = getUrlOfDest(this.formData.origin);
        },
        getNameOfDirs() {
            var filesArr = [];
            // 获取每个文件夹下的文件名
            if (this.arries.destResults != null) {
                this.arries.destResults.forEach(function(item, index) {
                    let filesNameItem = getTheFileArray(item);
                    filesArr.push(filesNameItem);
                })
                this.arries.filesNamesArray = filesArr;
            }
        },
        revampFileName() {
            //更改文件名
            this.arries.array1 = this.arries.filesNamesArray.flatMap(function(item, index) {
                return item;
            })
            for (let i in this.arries.array1) {
                //获取完整的文件全名路径
                this.arries.theNewNamesArr.push(changedTheFileName(this.arries.array1[i]));
                // 获取单独的文件名(不含前置路径)
                this.arries.filesNameArr.push(getTheNewFileName(this.arries.array1[i]));
                this.count++;
            }
        },
        movingFiles() {
            //批量迁移文件
            for (let i in this.arries.theNewNamesArr) {
                move2Dest(this.arries.theNewNamesArr[i], this.formData.destination, this.arries.filesNameArr[i]);
                this.countingMoving++;
            }
        }
        /* methods ending */
    },
    created() {
        console.log('...created...');
    },
    mounted() {
        console.dir(this);
    },
}
</script>
<style type="text/css" scoped="TestCase.vue">
.back_home {
    color: #ffffff;
    text-decoration-line: none;
}

.header_div_ {
    text-align: center;
    height: 60px;
    padding: 20px 0 0 0;
    background-color: #4f94ea;
}

.btn_div_ {
    text-align: center;
}

.btn_div_>button {
    margin: 0 15px;
}

input,
.el-input__inner {
    width: 60%;
}

#_tip_h_three {
    text-align: center;
    margin: 20px 0;
}
</style>