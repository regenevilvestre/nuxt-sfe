<template>
  <div id="js-slider" class="hero-slider">
    <button
      :class="{ 'is-disabled' : getSlider.active === 0 }"
      class="hero-slider__btn hero-slider__btn--prev"
      @click="goToSlide($event, 'prev')"
    >
      <span />
    </button>

    <div id="js-slider-track" class="hero-slider__track">
      <Slide v-for="(post, i) in posts" :key="i" :post="post" :index="i" />
    </div>

    <button
      :class="{ 'is-disabled' : getSlider.active === 2 }"
      class="hero-slider__btn hero-slider__btn--next"
      @click="goToSlide($event, 'next')"
    >
      <span />
    </button>

    <ul class="hero-slider__dots">
      <li v-for="(item, i) in posts.length" :key="i">
        <span
          :class="{ 'is-active': i === getSlider.active }"
          :index="i"
          class="hero-slider__dot"
          @click="goToSlide($event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Slide from '../components/Slide'
const EASINGS = {
  EASEOUTEXPO: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
  EASEOUTQUINT: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
}

export default {
  name: 'HeroSlider',
  components: {
    Slide
  },
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      slider: {
        active: 0,
        limit: 3,
        easing: EASINGS.EASEOUTQUINT,
        position: 0,
        track: null,
        target: null,
        width: 0
      }
    }
  },
  computed: {
    getSlider () {
      return this.slider
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.slider.limit = this.posts.length
      this.slider.target = document.querySelector('#js-slider')
      this.slider.track = document.querySelector('#js-slider-track')
      this.slider.width = this.slider.target.offsetWidth

      this.slider.track.style.transform = `translate3d(-${this.slider.position}px, 0, 0)`
    },
    getDirection (idx) {
      if (this.getSlider.active < idx) {
        return {
          direction: 'next',
          skip: (idx - this.getSlider.active) > 1,
          offset: idx - this.getSlider.active
        }
      } else {
        return {
          skip: (this.getSlider.active - idx) > 1,
          direction: 'prev',
          offset: this.getSlider.active - idx
        }
      }
    },
    goToSlide (e, direction = '') {
      this.slider.track.style.transition = this.slider.easing
      const obj = this.getDirection(parseInt(e.target.getAttribute('index')))

      if (direction === '') {
        direction = obj.direction
      }

      switch (direction) {
        case 'prev': {
          this.$logger(`prev ${obj.skip} ${obj.offset} ${e.target.getAttribute('index')}`)
          this.slider.track.style.transform = `
            translate3d(-${this.getSlider.position - this.getSlider.width}px, 0, 0)
          `
          this.slider.position = this.getSlider.position - this.getSlider.width
          this.slider.active--

          break
        }
        case 'next': {
          this.$logger(`next ${obj.skip} ${obj.offset} ${e.target.getAttribute('index')}`)
          this.slider.track.style.transform = `
            translate3d(-${this.getSlider.position + this.getSlider.width}px, 0, 0)
          `
          this.slider.position = this.getSlider.position + this.getSlider.width
          this.slider.active++

          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-slider {
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
.hero-slider__track {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}
.hero-slide {
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  min-height: 1px;
}
.hero-slider__dots {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  li {
    display: inline-block;
    vertical-align: middle;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
.hero-slider__dot {
  pointer-events: auto;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  background-color: $color-white;
  opacity: 0.5;
  border-radius: 50%;

  &.is-active {
    background-color: $color-black;
    opacity: 1;
    pointer-events: none;
  }
}
.hero-slider__btn {
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
//MODIFIER
.hero-slider__btn--prev {
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
.hero-slider__btn--next {
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
