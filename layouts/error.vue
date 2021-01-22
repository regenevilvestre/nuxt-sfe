<template>
  <div class="error">
    <Breadcrumbs :text="error.statusCode.toString()" :url="url" />
    <div class="container">
      <p class="error__text">
        {{ error.message }}
      </p>

      <nuxt-link to="/" class="error">
        Go back Home
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'

export default {
  name: 'Error',
  components: {
    Breadcrumbs
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      url: ''
    }
  },
  head () {
    return {
      title: `${process.env.NUXT_ENV_TITLE} | Error ${this.error.statusCode}`,
      meta: []
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  height: calc(100vh - 100px);
  /* background-color: $color-cod-gray; */
}
</style>
