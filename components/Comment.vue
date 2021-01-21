<template>
  <article class="comment">
    <slot name="content" />
    <time :datetime="comment.createdAt | format_datetime" class="comment__date">{{ comment.createdAt | format_comment_date }}</time>
  </article>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  display: block;
  background-color: $color-wild-sand;
  padding: 32px 42px 52px;;
  margin-bottom: 50px;
}
.comment__content {
  font-weight: 500;
  font-size: 18px;
  color: $color-cod-gray;
  line-height: 2.2;
  letter-spacing: 0.1em;
  margin-bottom: 26px;
}
.comment__date {
  font-family: $montserrat;
  font-size: 16px;
  font-weight: 700;
  color: $color-cod-gray;
  letter-spacing: 0.1em;
}
</style>
