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
            <time class="form__date" :datetime="getDate.datetimeStr">{{ getDate.dateStr }}</time>
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
import moment from 'moment'
import { required } from 'vuelidate/lib/validators'
import { ADD_POST } from '@/graphql'
import Textarea from '@/components/Textarea'
import ImageUpload from '@/components/ImageUpload'

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
    getDate () {
      return {
        dateStr: moment(new Date()).format('YYYY.MM.DD'),
        datetimeStr: moment(new Date()).format('YYYY-MM-DD')
      }
    },
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
      const hasChanges = [
        _.isEmpty(this.getForm.title),
        _.isEmpty(this.getForm.content),
        _.isEmpty(this.getForm.image)
      ].some(item => item === false)

      if (process.client && hasChanges) {
        const confirm = window.confirm('Are your sure you want cancel & discard changes?')

        if (confirm) {
          this.$router.push({ name: 'index' })
        }
      } else {
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
