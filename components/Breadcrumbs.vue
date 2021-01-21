<template>
  <div class="breadcrumbs">
    <div class="container">
      <ol class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <nuxt-link
            to="/"
            class="breadcrumbs__link"
          >
            <span class="breadcrumbs__text">
              HOME
            </span>
          </nuxt-link>
        </li>
        <li class="breadcrumbs__item">
          <nuxt-link
            :to="url"
            class="breadcrumbs__link"
          >
            <span class="breadcrumbs__text" v-line-clamp="1">
              {{ text }}
            </span>
          </nuxt-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    text: { type: String, default: '' },
    url: { type: String, default: '#' }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: block;
  max-height: 80px;
  background-color: $color-wild-sand;
}
.breadcrumbs__list {
  list-style: none;
  padding: 30px 0;
}
.breadcrumbs__item {
  display: inline-block;
  vertical-align: middle;
  color: blue;
  line-height: 0.6;

  &:last-child {
    .breadcrumbs__link {
      pointer-events: none;
      max-width: 1020px;
    }
  }
}
.breadcrumbs__link {
  display: inline-block;
  text-decoration: none;
}
.breadcrumbs__text {
  font-weight: 500;
  font-size: 16px;
  color: $color-cod-gray;
  letter-spacing: 0.1em;
  line-height: 1;
}
.breadcrumbs__item:not(:last-child) {
  padding-right: 38px;
  position: relative;

  &:after {
    position: absolute;
    content: '>';
    top: 50%;
    right: 17px;
    color: $color-cod-gray;
    transform: translateY(-50%);
  }
}
</style>
