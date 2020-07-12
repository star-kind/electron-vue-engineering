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
                <p>{{sentence}}</p>
            </div>
            <el-row style="text-align: center;margin: 22px 0 0 0;">
                <el-button type="primary" round @click="sendSyncMsg">发送异步信息至主进程</el-button>
            </el-row>
        </el-main>
        <!--  -->
    </el-container>
</template>
<script type="text/javascript">
const ipcRenderer = require('electron').ipcRenderer;

export default {
    name: 'TestCase',
    data() {
        return {
            sentence: "渲染进程是应用内的一个浏览器窗口,与主进程不同,它能够同时存在多个且运行于不同的进程.且它们也能够被隐藏."
        }
    },
    methods: {
        sendSyncMsg: function() {
            // 发送标识为asynchronous-message的消息
            ipcRenderer.send('asynchronous-message', '我来自渲染进程');
            // 接收标识为asynchronous-reply的消息
            ipcRenderer.on('asynchronous-reply', function(event, arg) {
                console.log('====' + arg);
            })
        }
    },
    mounted() {
        console.dir(this)
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
</style>