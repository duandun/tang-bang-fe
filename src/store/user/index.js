
import * as types from '../mutation-types.js';
import api from '@/api'

const state = {
  userInfo: {}
};

const getters = {
  userInfo(state) {
    return state.userInfo
  },
  getUserStatus(state) {
    return state.status
  }
};

const mutations = {
  [types.USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
};

const actions = {
  setUserInfo({ commit }) {
    api.auth.getUserInfo().then(results => {
      commit(types.USER_INFO, results)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
