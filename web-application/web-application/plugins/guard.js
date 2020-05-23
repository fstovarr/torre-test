export default (inject) => {
  const Guard = {
    hasPermissions: (route, name) => {
      return true
    }
  }
  inject('guard', Guard)
}
