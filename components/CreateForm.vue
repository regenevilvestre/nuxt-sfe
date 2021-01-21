<template>
  <div class="post">
    <div class="container">
      <form
        id="form"
        action="/"
        novalidate
        method="post"
        class="form form--create-post"
        enctype="multipart/form-data"
      >
        <div class="form__inner">
          <div class="form__block">
            <div class="post__actions clearfix">
              <div class="post__actions-list">
                <Button modifier="btn--basic" text="Save Post" type="submit" @click.native="submit($event)" />
                <Button modifier="btn--basic" text="Cancel" @click.native="cancel($event)" />
              </div>
            </div>
            <time class="form__date" :datetime="new Date() | format_datetime">{{ new Date() | format_date }}</time>
          </div>

          <div class="form__block">
            <Textarea
              v-model="form.title"
              field="title"
              modifier="textarea--title"
              placeholder="Title"
            />
          </div>

          <div class="form__block">
            <ImageUpload
              field="image"
              @change="selectImage($event)"
            />
          </div>

          <div class="form__block">
            <Textarea
              v-model="form.content"
              field="content"
              modifier="textarea--create-post"
              placeholder="Content"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { required } from 'vuelidate/lib/validators'
import { ADD_POST } from '../graphql'
import Textarea from './Textarea'
import ImageUpload from './ImageUpload'

export default {
  name: 'CreatePost',
  components: {
    ImageUpload,
    Textarea
  },
  middleware: 'auth',
  data () {
    return {
      form: {
        title: '',
        image: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState(['isAuth', 'token']),
    getForm () { return this.form }
  },
  watch: {
    isAuth (newVal, oldVal) {
      if (oldVal && !newVal) {
        this.$router.push({ name: 'index' })
      }
    }
  },
  validations: {
    form: {
      title: { required },
      image: {},
      content: {}
    }
  },
  methods: {
    selectImage (e) {
      this.form.image = e[1]
    },
    cancel (e) {
      if (!_.isEmpty(this.getForm.title) || !_.isEmpty(this.getForm.content) || !_.isEmpty(this.getForm.image)) {
        const confirm = window.confirm('Are your sure you want cancel & discard changes?')
        if (confirm) {
          this.$router.push({ name: 'index' })
        }
      } else {
        this.$logger('cancel...')
        this.$router.push({ name: 'index' })
      }
    },
    async submit (e) {
      e.preventDefault()

      if (!this.$v.form.$invalid) {
        await this.$apollo.mutate({
          mutation: ADD_POST,
          variables: {
            post: { ...this.getForm }
          },
          context: {
            headers: {
              authorization: this.token ? this.token : ''
            }
          }
        })
          .then((res) => {
            this.$logger(res)
            const params = { params: { id: res.data.addPost.id } }
            this.$router.push({ name: 'view-id', ...params })
          })
          .catch((err) => {
            this.$logger(err)
          })
      }
    }
  }
}
</script>
