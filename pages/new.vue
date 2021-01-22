<template>
  <div class="new-post">
    <Breadcrumbs :text="title" />
    <CreateForm />
  </div>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs'
import CreateForm from '../components/CreateForm'

export default {
  name: 'NewPost',
  components: {
    Breadcrumbs,
    CreateForm
  },
  middleware: 'auth',
  data () {
    return {
      title: 'Create New Post'
    }
  },
  head () {
    return {
      title: `${process.env.NUXT_ENV_TITLE} | ${this.title}`,
      meta: []
    }
  }
}
</script>

<style lang="scss" scoped>
.new-post {
  display: block;
}
</style>
