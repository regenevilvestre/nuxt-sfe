<template>
  <div class="post-detail">
    <Breadcrumbs :text="getPost.title" :url="`/${getPost.id}`" />

    <div class="container">
      <div class="form form--edit-post">
        <div class="form__inner">
          <div class="form__block">
            <div class="post__actions clearfix">
              <div class="post__actions-list">
                <Button modifier="btn--basic" text="Save Post" type="submit" @click.native="submit($event)" />
                <Button modifier="btn--basic" text="Cancel" @click.native="cancel($event)" />
              </div>
            </div>
            <time class="form__date" :datetime="getPost.createdAt | format_datetime">{{ getPost.createdAt | format_date }}</time>
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
              :image="getPost.image"
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

          <div class="post-detail__comments">
            <CommentForm
              :post-id="getPost.id"
              @addComment="fetchPost()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { GET_POST, UPDATE_POST } from '../../graphql'
import Button from '../../components/Button'
import Breadcrumbs from '../../components/Breadcrumbs'
import CommentForm from '../../components/CommentForm'
import Textarea from '../../components/Textarea'
import ImageUpload from '../../components/ImageUpload'
import mixins from '../../plugins/mixins'

export default {
  name: 'UpdatePost',
  components: {
    Button,
    Breadcrumbs,
    CommentForm,
    ImageUpload,
    Textarea
  },
  mixins: [mixins],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async fetch () {
    await this.$apollo.query({
      query: GET_POST,
      fetchPolicy: 'no-cache',
      variables: {
        id: parseInt(this.$route.params.id)
      }
    })
      .then((response) => {
        const post = response.data.post
        this.post = { ...this.post, ...post }
        this.form = { ...post }
      })
  },
  middleware: 'auth',
  data () {
    return {
      title: 'Edit Post',
      edit: false,
      post: {},
      form: {
        title: '',
        image: '',
        content: ''
      }
    }
  },
  computed: {
    getPost () { return this.post },
    getEdit () { return this.edit },
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
    async fetchPost () {
      await this.$apollo.query({
        query: GET_POST,
        fetchPolicy: 'no-cache',
        variables: {
          id: parseInt(this.$route.params.id)
        }
      })
        .then((response) => {
          const post = response.data.post
          this.post = { ...this.post, ...post }
          this.form = { ...post }
        })
    },
    getPostId () {
      return this.$route.params.id
    },
    goto (id) {
      const params = { params: { id } }
      this.$router.push({ name: 'edit-id', ...params })
    },
    cancel (e) {
      const confirm = window.confirm('Are your sure you want cancel & discard changes?')
      if (confirm) {
        this.edit = false
        this.$router.push({ name: 'index' })
      }
    },
    selectImage (e) {
      this.form.image = e[1]
    },
    async submit (e) {
      e.preventDefault()
      const form = {
        id: this.getForm.id,
        title: this.getForm.title,
        content: this.getForm.content,
        image: this.getForm.image
      }

      if (!this.$v.form.$invalid) {
        await this.$apollo.mutate({
          mutation: UPDATE_POST,
          variables: {
            post: { ...form }
          },
          context: {
            headers: {
              authorization: this.token ? this.token : ''
            }
          }
        })
          .then((res) => {
            const params = { params: { id: this.getForm.id } }
            this.$router.push({ name: 'view-id', ...params })
          })
          .catch((err) => {
            this.$logger(err)
          })
      }
    }
  },
  head () {
    return {
      title: this.textLimit(`${process.env.NUXT_ENV_TITLE} | ${this.title}`),
      meta: []
    }
  }
}
</script>

<style lang="scss">
.post {
  display: block;
}
.post__date {
  font-family: $montserrat;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.2em;
}
.post__title {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: 0.1em;
  margin-top: 30px;
}
.post__content {
  font-size: 18px;
  line-height: 2.5;
  padding: 50px 0 125px;
  border-bottom: 1px solid $color-cod-gray;
}
</style>
