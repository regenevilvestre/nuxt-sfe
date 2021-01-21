<template>
  <article class="card-post">
    <nuxt-link :to="`/view/${post.id}`" class="card-post__link">
      <div class="card-post__inner">
        <div class="card-post__thumb">
          <div :style="showPlaceholder(post.image)" />
        </div>
        <div class="card-post__content">
          <time
            class="card-post__date"
            :datetime="post.createdAt | format_datetime"
          >
            {{ post.createdAt | format_date }}
          </time>
          <slot name="title" class="card-post__title" />
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import mixins from '../plugins/mixins'

export default {
  name: 'CardPost',
  mixins: [mixins],
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      maxLines: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.card-post {
  display: block;
  border: 1px solid $color-cod-gray;
}
.card-post__link {
  color: $color-cod-gray;
}
.card-post__inner {
  padding: 40px 29px 29px;
}
.card-post__thumb {
  margin-bottom: 23px;

  div {
    position: relative;
    padding-top: 71.4%;
    background-position: center;
    background-size: cover;
  }
}
.card-post__date {
  font-family: $montserrat;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.55;
  color: $color-cod-gray;
}
.card-post__title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.001em;
  line-height: 1.6;
  margin-top: 5px;
}
</style>
