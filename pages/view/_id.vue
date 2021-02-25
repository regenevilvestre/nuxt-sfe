<template>
  <article class="post">
    <Breadcrumbs :text="post.title" :url="`/${post.id}`" />
    <div class="container">
      <div class="post__actions clearfix">
        <div class="post__actions-list">
          <Button
            v-if="isAuth"
            modifier="btn--basic"
            text="Edit Post"
            @click.native="goto(post.id)"
          />
        </div>
      </div>

      <time class="post__date" :datetime="post.createdAt | format_datetime">{{ post.createdAt | format_date }}</time>

      <h1 class="post__title">
        {{ post.title }}
      </h1>

      <div class="post__image">
        <div :style="showPlaceholder(post.image)" />
      </div>

      <div class="post__content">
        {{ post.content }}
      </div>

      <section class="section">
        <h2 class="section__title section__title--comment">
          COMMENT
        </h2>
        <div class="section__content">
          <ul class="view__comment-list">
            <li
              v-for="comment in post.comments"
              :key="comment.id"
              class="view__comment-item"
            >
              <Comment :comment="comment">
                <h3
                  slot="content"
                  class="comment__content"
                >
                  {{ comment.content }}
                </h3>
              </Comment>
            </li>
          </ul>
        </div>
        <div>
          <CommentForm :post-id="post.id" @addComment="refetch" />
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { GET_POST } from '@/graphql'
import mixins from '@/plugins/mixins'
import Comment from '@/components/Comment'
import CommentForm from '@/components/CommentForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'

export default {
  name: 'Id',
  components: {
    Comment,
    CommentForm,
    Breadcrumbs,
    Button
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
      .then((res) => {
        this.post = { ...res.data.post }
      })
      .catch((err) => {
        if (err) {
          return this.$nuxt.error(err)
        }
      })
  },
  data () {
    return {
      post: {}
    }
  },
  computed: {
    ...mapState(['isAuth', 'token']),
    ...mapGetters({
      auth: 'getIsAuth'
    })
  },
  methods: {
    refetch () {
      this.$fetch()
    },
    goto (id) {
      const params = { params: { id } }
      this.$router.push({ name: 'edit-id', ...params })
    }
  },
  head () {
    const title = this.textLimit(`${process.env.NUXT_ENV_TITLE} | ${this.post.title}`)
    return {
      title,
      description: this.post.title,
      meta: []
    }
  }
}
</script>
