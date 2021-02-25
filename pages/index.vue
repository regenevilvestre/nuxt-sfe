<template>
  <div class="home">
    <Hero />
    <News />
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import News from '@/components/News'

export default {
  name: 'Index',
  components: {
    Hero,
    News
  },
  head () {
    return {
      meta: []
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 150px;
}
</style>
