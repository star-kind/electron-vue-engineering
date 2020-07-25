import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [{
            path: '/',
            name: 'landing-page',
            component: require('@/components/LandingPage').default
        },
        {
            path: '*',
            redirect: '/'
        },
        /* new view */
        {
            path: '/TestCase',
            name: 'test-case',
            component: () => import('@/views/TestCase.vue'),
            alias: 'testCase'
        },
        {
            path: '/RenameAndMoveFile',
            name: 'RenameAndMoveFile',
            component: resolve => require(['@/views/RenameAndMoveFile.vue'], resolve),
            alias: 'renameAndMoveFile'
        },
        {
            path: '/biliMedia',
            name: 'biliMedia',
            component: resolve => require(['@/views/biliMedia.vue'], resolve),
            alias: 'bilibiliMedia'
        },
        {
            path: '/UserList',
            name: 'UserList',
            component: resolve => require(['@/views/UserList.vue'], resolve),
            alias: 'userList'
        },
        {
            path: '/Register',
            name: 'Register',
            component: resolve => require(['@/views/Register.vue'], resolve),
            alias: 'register'
        },
        {
            path: '/Login',
            name: 'Login',
            component: resolve => require(['@/views/Login.vue'], resolve),
            alias: 'login'
        },
        {
            path: '/Privately',
            name: 'Privately',
            component: resolve => require(['@/views/Privately.vue'], resolve),
            alias: 'privately'
        },
        {
            path: '/AlterPassword',
            name: 'AlterPassword',
            component: resolve => require(['@/views/AlterPassword.vue'], resolve),
            alias: 'alterPassword'
        },
    ]
})