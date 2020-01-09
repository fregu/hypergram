import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import auth from 'utils/auth'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import * as serviceWorker from './serviceWorker'

const pathName = window.location.pathname
if (pathName === '/logout') {
  auth.logout()
  window.location.href = '/'
}
const matchAuthCallback = pathName.match(/^\/auth\/callback\/(google|facebook)/)
if (matchAuthCallback) {
  auth.connect(matchAuthCallback[1], window.location.search).then(success => {
    if (success) {
      window.location.href = '/'
      return false
    }
  })
}

const token = auth.getToken()
const { apiUrl } = auth
const client = new GraphQLClient({
  url: `${apiUrl}/graphql`,
  ...(token
    ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    : {})
})

const Root = () => (
  <ClientContext.Provider value={client}>
    <App
      isAuthenticated={auth.isAuthenticated()}
      token={token}
      apiUrl={apiUrl}
    />
  </ClientContext.Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.register()
