<template>
  <div class="error">
    <Breadcrumbs :text="resolveError(error.statusCode)" />
    <div class="container">
      <div class="error__content">
        <div class="error__message">
          <h1 class="error__title">
            ERROR <strong>{{ error.statusCode }}</strong>
          </h1>
          <p class="error__sub">
            {{ resolveError(error.statusCode) }}
          </p>

          <div class="error__footer">
            <nuxt-link to="/" class="error__link">
              GO BACK HOME
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'
import mixins from '../plugins/mixins'

export default {
  name: 'Error',
  components: {
    Breadcrumbs
  },
  mixins: [mixins],
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      url: ''
    }
  },
  head () {
    return {
      title: `${this.resolveError(this.error.statusCode)} | ${process.env.NUXT_ENV_TITLE}`,
      meta: []
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  height: calc(100vh - 100px);
}
.error__content {
  display: table;
  vertical-align: middle;
  width: 100%;
  height: calc(100vh - 178px);
}
.error__message {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.error__footer {
  margin-top: 100px;
}
.error__link {
  text-decoration: none;
  color: $color-black;
}
.error__title {
  display: inline-block;
  font-family: $montserrat;
  font-size: 32px;
  border-bottom: 2px solid $color-black;
  margin: 0;

  strong {
    font-size: 64px;
  }
}
.error__sub {
  font-family: $montserrat;
  font-size: 18px;
  line-height: 2;
  margin: 0;
}
</style>
