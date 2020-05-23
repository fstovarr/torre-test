export const actions = {
  initState({ commit }) {
    commit('setToken', this.$cookiz.get('token'))
  },
  async login({ commit }, { username, password }) {
    try {
      const response = await this.$axios.$post('/login', {
        authentication: { username, password }
      })

      const { token } = response.data
      commit('setToken', token)

      return Promise.resolve(response)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async logout({ commit }) {
    try {
      await Promise.resolve()
      commit('removeToken')
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const getters = {
  isAuthenticated: (state) => state.token !== undefined
}

export const mutations = {
  setToken(state, token) {
    if (token !== undefined) this.$cookiz.set('token', token)
    else this.$cookiz.remove('token')

    this.$axios.setToken(token, 'Bearer')
    state.token = token
  },
  removeToken(state) {
    this.$cookiz.remove('token')
    state.token = undefined
    this.$axios.setToken(undefined, 'Bearer')
  }
}

export const state = () => ({
  token: undefined
})
