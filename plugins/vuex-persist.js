import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'nuxt-spa',
      storage: window.localStorage
    }).plugin(store)
  })
}
