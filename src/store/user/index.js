import * as types from '../mutation-types.js';
import api from '@/api'
import includes from 'lodash/includes'

const state = {
  userInfo: {},
  menuList: []
};

const getters = {
  userInfo(state) {
    return state.userInfo
  },
  getUserStatus(state) {
    return state.status
  },
  menuList(state) {
    return state.menuList
  }
};

const mutations = {
  [types.USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.MENU_LIST] (state, menu) {
    state.menuList = menu.list
    if (state.userInfo.role !== 'admin') {
      state.menuList.splice(2, 1)
    }
    const permission = state.userInfo.permission
    if (!includes(permission, '1')) {
      state.menuList.splice(0, 1)
    }
  }
};

const actions = {
  setUserInfo({ commit }, { menu }) {
    return api.auth.getUserInfo().then(results => {
      commit(types.USER_INFO, results)
      commit(types.MENU_LIST, menu)
      return results
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
