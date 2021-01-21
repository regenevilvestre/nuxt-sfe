import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// const API_URL = process.env.API_URL
//
// console.log(process.env.API_URL.toString().length)

const httpLink = new HttpLink({ uri: process.env.NUXT_ENV_API_URL })

export default () => ({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultHttpLink: false
})
