import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Replace this with your project's endpoint
const API_URL = 'http://localhost:4000/graphql'

const httpLink = new HttpLink({ uri: API_URL })

export default () => ({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultHttpLink: false
})
