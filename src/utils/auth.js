const jwtDecode = require('jwt-decode')

const apiUrl = 'https://hypergram.herokuapp.com'

// save access token to local storage
const storage = {
  remove: key => localStorage.removeItem(key),
  get: key => JSON.parse(localStorage.getItem(key)) || null,
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value))
}
const auth = {
  apiUrl,
  connect: async (provider, queryString) => {
    const response = await fetch(
      `${apiUrl}/auth/${provider}/callback${queryString}`
    )

    const data = await response.json()

    if (data && data.jwt) {
      auth.setToken(data.jwt)
      return data.jwt
    }
    return false
  },
  logout: () => {
    storage.remove('accessToken')
  },
  getToken: () => {
    const token = storage.get('accessToken')
    if (!token) {
      return false
    }
    // decode the stored access token to make sure it still is valid
    const { exp: expires } = jwtDecode(token)
    return expires && expires > new Date() / 1000 && token
  },
  setToken: token => {
    storage.set('accessToken', token)
  },
  isAuthenticated: () => !!auth.getToken()
}
export default auth
