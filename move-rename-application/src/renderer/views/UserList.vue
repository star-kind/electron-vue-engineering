<template>
    <el-container>
        <el-header class="header_div_">
            <router-link to="landing-page" class="back_home">
                主页
            </router-link>
        </el-header>
        <!--  -->
        <el-main class="own_main_div">
            <div>
                <p>{{jsonString}}</p>
            </div>
            <!--  -->
            <div class="the_whole_users">
                <table cellspacing="0" cellpadding="0" border="1" id="mine_table" style="width: 100%;font-size: 24px;">
                    <th>选择<input type="checkbox"></th>
                    <th id="id_check">ID</th>
                    <th>用户名</th>
                    <th>电话</th>
                    <th>邮箱</th>
                    <tbody class="tbl_user_body" ref="theWholeUsers">
                    </tbody>
                </table>
            </div>
            <!--  -->
            <div>
                <el-table :data="tableData" ref="listTable" style="width: 100%" border>
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
import { getParaStr, getTheStr } from '@/utils/sqlite/test/intoVueTest';

import { UserService2 } from '@/utils/sqlite/service/UserService2';
import { intoVueTest } from '@/utils/sqlite/test/intoVueTest';

export default {
    name: 'UserList',
    data() {
        return {
            tblHtmlText: '',
            jsonString: '',
            showOper: true,
            tableData: [{
                id: "",
                username: "",
                phone: "",
                email: ""
            }],
            tableCol: [
                { prop: "id", label: "序号", width: 180 },
                { prop: "username", label: "用户名字", width: 200 },
                { prop: "phone", label: "电话", width: 200 },
                { prop: "email", label: "电邮地址", width: 200 },
            ],
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        getUserTableText(arr) {
            var htm = '';
            arr.forEach(function(item) {
                console.log(item);
            });
            for (let index in arr) {
                htm += '<tr id="row_' + arr[index].id + '">';

                htm += '<td>';
                htm += '<input type="checkbox" class=u_i" ';
                htm += ' value=' + arr[index].id + '>';
                htm += '</td>';

                htm += '<td>' + arr[index].id + '</td>';
                htm += '<td>' + arr[index].username + '</td>';
                htm += '<td>' + arr[index].phone + '</td>';
                htm += '<td>' + arr[index].email + '</td>';
                htm += '</tr>';
            }
            this.tblHtmlText = htm;
        },
        getUserList() {
            var userService = new UserService2();
            console.info('userService=== ');
            console.dir(userService);
            userService = userService.constructor.prototype;
            console.dir(userService);
            var usersData = userService.findAllUser();
            console.dir(usersData);
            usersData.then(v => {
                console.dir(v);
                // this.tableData = v;
                this.getUserTableText(v);
                this.jsonString = JSON.stringify(v);
                this.$refs.theWholeUsers.innerHTML = this.tblHtmlText;
            }, v => {});
        },
        getStringTest() {
            var t1 = getParaStr('quick,fashion:');
            var t2 = getTheStr('joking', 1485, 'everyone', 'dinner');
            console.log(t1 + ',' + t2);
        },
        inTest() {
            var into = new intoVueTest();
            // console.dir(into);
            var informat = into.constructor.prototype.getAJob()
            console.log(informat);
            var informat2 = into.constructor.prototype.getMineString('coin', 'cherry', 'yours', 67043, 47910);
            console.log(informat2);
            var informat3 = into.constructor.prototype.order;
            console.log(informat3);
        },
    },
    mounted() {
        // console.dir(this);
        // this.inTest();
        // this.getStringTest();
        this.getUserList();
    },
    updated() {
        console.info('....updated....');
        console.dir(this);
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

.own_main_div {
    font-family: monospace;
    font-size: 20px;
}
</style>