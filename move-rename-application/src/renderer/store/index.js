import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    plugins: [
        createPersistedState(),
        createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'production'
})