export default async (ctx) => {
  const { $axios, store } = ctx
  await store.dispatch('nuxtClientInit', ctx)

  const token = store.state.auth.token

  $axios.setToken(token, 'Bearer')
}
