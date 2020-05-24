export const actions = {
  initState({ commit }) {
    commit('setToken', this.$cookiz.get('token'))
  },
  async login({ commit }, { username, password, type }) {
    try {
      const response = await this.$axios.$post('/api/v1/auth/login', {
        user: { username, password, type }
      })

      const token = response
      commit('setToken', token)

      return Promise.resolve(token.access)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async signup(
    { commit },
    { username, email, password, passwordConfirmation, type, name }
  ) {
    console.log('signup', this.$axios)
    try {
      const user = await this.$axios.$post('/api/v1/auth/users', {
        user: {
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
          type,
          name
        }
      })

      const { token } = user

      commit('setToken', token)

      return Promise.resolve(token.access)
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

// import jwt from 'jwt-decode'
export const getters = {
  isAuthenticated: (state) => state.token !== undefined
  // userType: (state) => {
  //   if (state.token) return jwt(state.token).type
  //   else return 'unauth'
  // }
}

export const mutations = {
  setToken(state, token) {
    if (token !== undefined) {
      this.$cookiz.set('token', token.access)
      this.$cookiz.set('refresh', token.refresh)
    } else {
      this.$cookiz.remove('token')
      this.$cookiz.remove('refresh')
    }

    this.$axios.setToken((token || {}).access, 'Bearer')

    state.token = (token || {}).access
    state.refresh = (token || {}).refresh
  },
  removeToken(state) {
    this.$cookiz.remove('token')
    this.$cookiz.remove('refresh')
    state.token = undefined
    state.refresh = undefined
    this.$axios.setToken(undefined, 'Bearer')
  }
}

export const state = () => ({
  token: undefined,
  refresh: undefined
})
