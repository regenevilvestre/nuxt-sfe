<template>
  <nuxt-link to="/" class="logo">
    <img
      v-if="color === 'dark'"
      src="/images/logo-dark.png"
      alt=""
    >
    <img
      v-else
      src="/images/logo-default.png"
      alt=""
    >
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: { type: String, default: 'light' }
  }
}

</script>

<style lang="scss">
.logo {
  display: inline-block;
  img {
    max-width: 100%;
    width: 100%;
  }
}
</style>
