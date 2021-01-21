<template>
  <button class="btn" :class="modifier" :type="type">
    <span class="btn__text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    modifier: { type: String, default: '' },
    text: { type: String, default: '' },
    type: { type: String, default: 'button' }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  display: inline-block;
  cursor: pointer;
  min-width: 340px;
  background-color: $color-cod-gray;
  outline: none;
  border: 0;
  padding: 23px 0;
  transition: background $duration $easing;

  &:hover {
    background-color: transparentize($color-cod-gray, 0.5);
  }
}
.btn__text {
  display: inline-block;
  text-align: center;
  font-family: $montserrat;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: $color-white;
}
.btn--fluid {
  width: 100%;
}
.btn--basic {
  display: inline-block;
  background-color: transparent;
  border-bottom: 1px solid $color-cod-gray;
  min-width: unset;
  padding: 0;
  line-height: 1;

  &:hover {
    background-color: transparent;
  }

  .btn__text {
    color: $color-cod-gray;
  }
}
.btn--comment-submit {
  min-width: 210px;
}
.btn--borderless {
  border: 0;
}
</style>
