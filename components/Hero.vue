<template>
  <div class="hero">
    <div class="hero__inner">
      <div class="hero__content">
        <client-only>
          <HeroSlider :posts="posts" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_PAGINATED_POSTS } from '../graphql'
import HeroSlider from '../components/HeroSlider'

export default {
  name: 'Hero',
  components: {
    HeroSlider
  },
  data () {
    return {
      posts: []
    }
  },
  apollo: {
    posts: {
      query: GET_PAGINATED_POSTS,
      variables: {
        pagination: {
          limit: 3,
          offset: 0
        }
      },
      update (data) {
        return data.posts
      }
    }
  }
}
</script>

<style lang="scss">
.hero {
  display: table;
  vertical-align: middle;
  width: 100%;
  height: calc(100vh - 100px);
}
.hero__inner {
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 100px);
}
.hero__content {
  position: relative;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - 100px);
}
</style>
