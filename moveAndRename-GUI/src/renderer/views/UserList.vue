<template>
    <el-container>
        <el-header class="header_div_">
            <router-link to="landing-page" class="back_home">
                主页
            </router-link>
        </el-header>
        <!--  -->
        <el-main>
            <div>
                <el-table :data="tableData" style="width: 100%" border>
                    <!--  -->
                    <el-table-column v-for="(item,i) in tableCol" :key="i" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
                    <!--  -->
                    <el-table-column label="操作" v-if="showOper">
                        <!--  -->
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <!--  -->
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <!--  -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { findAllUser } from '@/utils/sqlite/service/UserService';

export default {
    name: 'UserList',
    data() {
        return {
            showOper: true,
            tableData: [{
                id: "",
                username: "",
                phone: "",
                email: ""
            }, ],
            tableCol: [
                { prop: "ID", label: "序号", width: 180 },
                { prop: "username", label: "用户名字", width: 200 },
                { prop: "phone", label: "电话", width: 200 },
                { prop: "email", label: "电邮地址", width: 200 },
            ]
        };
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        getUserList() {
            var res = findAllUser();
            console.log(res);
        },
    },
    mounted() {
        console.dir(this);
        this.getUserList();
    },
    updated() {
        console.info('....updated...')
    },
    /*END*/
}
</script>
<style scoped="UserList.vue">
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
</style>