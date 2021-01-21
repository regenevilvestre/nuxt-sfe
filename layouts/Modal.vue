<template>
  <div class="modal">
    <div class="modal__inner">
      <div class="modal__content">
        <div class="modal__body">
          <div class="modal__head clearfix">
            <slot name="title">
              default title
            </slot>
          </div>
          <slot name="content">
            default content
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  display: table;
  vertical-align: middle;
  width: 100%;
  height: calc(100% - 100px);
  z-index: $zmax + 2;
  background-color: $color-white;
}
.modal__inner {
  display: table-cell;
  vertical-align: middle;
}
.modal__body {
  display: block;
  width: 100%;
  max-width: 460px;
  margin: -25px auto 0;
}
.modal__title {
  font-family: $montserrat;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
</style>
