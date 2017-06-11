import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger';
import circuit from './modules/circuit.js';
import user from './user';

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        circuit,
        user
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
