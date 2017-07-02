
import * as types from '../mutation-types.js';
import * as CONST from './const.js';

const state = {
  status: CONST.ST_NOT_LOGINED,
  userInfo: null
};

const getters = {
  getUserInfo(state) {
    return state.userInfo;
  },
  getUserStatus(state) {
    return state.status;
  }
};

const mutations = {
  [types.USER_LOGIN] (state, userInfo) {
    state.userInfo = userInfo;
    state.status = CONST.ST_HAS_LOGINED;
  },
  [types.USER_LOGOUT] (state) {
    state.userInfo = null;
    state.status = CONST.ST_NOT_LOGINED;
  }
};

const actions = {
  login({ commit }) {
    let userObj = {};
    commit(types.USER_LOGIN, userObj);
  },
  logout({ commit }) {
    commit(types.USER_LOGOUT);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
