import * as types from './mutations'

export const updateRole = ({commit}, role) => {
  commit(types.UPDATE_ROLE, Number(role))
}
