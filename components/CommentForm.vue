<template>
  <form
    novalidate
    action="/"
    method="post"
    class="form"
    @submit.prevent="submit($event)"
  >
    <div class="form__inner">
      <div class="form__block">
        <Textarea
          v-model="form.content"
          field="content"
          modifier="textarea--comment-form"
          placeholder="Write comment"
        />
      </div>
      <div class="form__block clearfix">
        <div class="form__action">
          <Button
            text="SUBMIT"
            modifier="btn--comment-submit"
            @click.native="submit($event)"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ADD_COMMENT } from '../graphql'
import Textarea from './Textarea'
import Button from './Button'

export default {
  name: 'CommentForm',
  components: {
    Button,
    Textarea
  },
  props: {
    postId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      form: {
        content: ''
      }
    }
  },
  computed: {
    getForm () { return this.form }
  },
  methods: {
    async submit (e) {
      e.preventDefault()

      if (this.form.content.trim() !== '') {
        this.form.postId = this.postId
        this.$logger(this.form)
        await this.$apollo.mutate({
          mutation: ADD_COMMENT,
          variables: {
            postId: this.postId,
            content: this.getForm.content
          }
        })
          .then((response) => {
            this.$emit('addComment')
            this.form.content = ''
          })
      }
    }
  }
}
</script>
