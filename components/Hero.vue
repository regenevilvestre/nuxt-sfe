<template>
  <div class="hero">
    <div class="hero__inner">
      <div class="hero__content">
        <div class="hero__slider">
          <button class="hero__slider-btn hero__slider-btn--prev">
            <span />
          </button>
          <button class="hero__slider-btn hero__slider-btn--next">
            <span />
          </button>

          <div
            v-for="post in posts"
            :key="post.id"
            class="hero__slider-track"
          >
            <Slide :post="post" />
          </div>

          <div class="hero__slider-dots">
            <span
              v-for="(post, i) in posts"
              :key="post.id"
              :class="i===0 ? 'is-active' : ''"
              class="hero__slider-dot"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_PAGINATED_POSTS } from '../graphql'
import Slide from '../components/Slide'
export default {
  name: 'Hero',
  components: {
    Slide
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

<style lang="scss" scoped>
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
.hero__slider {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.hero__slider-track {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.hero__slide {
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  min-height: 1px;
}
.hero__slider-dots {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.hero__slider-dot {
  pointer-events: auto;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  background-color: $color-white;
  opacity: 0.5;
  border-radius: 50%;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &.is-active {
    background-color: $color-black;
    opacity: 1;
    pointer-events: auto;
  }
}
.hero__slider-btn {
  position: absolute;
  top: calc(50% - 22px);
  transform: translateY(-50%);
  outline: none;
  display: inline;
  z-index: 3;
  background-color: transparent;
  border: 0;

  span {
    position: relative;
    display: block;
    width: 16px;
    height: 22px;

    &:before, &:after {
      position: absolute;
      content: "";
      min-width: 5px;
      min-height: 17px;
      background-color: $color-black;
    }

  }

  &.is-disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
.hero__slider-btn--prev {
  left: 50px;

  span {
    &:before {
      bottom: -2px;
      left: 5px;
      transform: rotate(-45deg);
    }
    &:after {
      top: -2px;
      left: 5px;
      transform: rotate(45deg);
    }
  }
}
.hero__slider-btn--next {
  right: 50px;

  span {
    &:before {
      bottom: -2px;
      left: 6px;
      transform: rotate(45deg);
    }
    &:after {
      top: -2px;
      left: 6px;
      transform: rotate(-45deg);
    }
  }
}
</style>
