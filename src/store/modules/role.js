import * as types from '../mutations'

const state = {
  role: localStorage.role ? Number(localStorage.role) : 20
}

const mutations = {
  [types.UPDATE_ROLE] (state, role) {
    localStorage.role = role
    state.role = role
  }
}

export default {
  state,
  mutations
}
