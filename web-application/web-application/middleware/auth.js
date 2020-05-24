import jwt from 'jwt-decode'

export default function({ route, store, error, redirect }) {
  console.log('ROUTE', route.path, store.state.auth.token)

  if (!route.meta[0].public && !store.getters['auth/isAuthenticated'])
    redirect('/auth/login')
  else if (!route.path.startsWith(`/${jwt(store.state.auth.token).type}`))
    // Check permissions for the route
    return error({
      statusCode: 403
    })
}
