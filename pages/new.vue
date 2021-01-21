<template>
  <div class="new-post">
    <Breadcrumbs text="Create New Post" />
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
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>
.new-post {
  display: block;
}
</style>
