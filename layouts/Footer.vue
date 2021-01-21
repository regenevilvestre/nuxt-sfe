<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <Logo />
        <p class="footer__text">
          サンプルテキストサンプル ルテキストサンプルテキストサ<br>
          ンプルテキストサンプル ルテキスト
        </p>
      </div>
    </div>

    <div class="footer__bottom">
      <small class="footer__copyright">
        Copyright©2007-2019 Blog Inc.
      </small>
    </div>
  </footer>
</template>

<script>
import Logo from '../components/Logo'
export default {
  name: 'AppFooter',
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: block;
  width: 100%;
}
.footer__top {
  padding-top: 80px;
  padding-bottom: 66px;
  background-color: $color-mine-shaft;
}
.footer__bottom {
  text-align: center;
  color: $color-white;
  background-color: $color-cod-gray;
  padding: 34px 0;
}
.footer__text {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.7;
  color: $color-white;
  margin-top: 38px;
}
.footer__copyright {
  font-family: $montserrat;
  font-size: 16px;
}
</style>
