<template>
  <section class="section section--news">
    <div class="container">
      <div class="section__heading clearfix">
        <client-only>
          <nuxt-link
            v-if="isAuth"
            to="/new"
            class="section__link"
          >
            <span class="section__link-text">Create New Post</span>
          </nuxt-link>
        </client-only>

        <h2 class="section__title">
          NEWS
        </h2>
      </div>
      <div class="section__content">
        <div class="news__list">
          <ul class="news__list-inner row">
            <li
              v-for="post in getPosts"
              :key="post.id"
              class="news__list-item col-lg--4"
            >
              <CardPost :post="post">
                <h3 slot="title" class="card-post__title" v-line-clamp="3">
                  {{ post.title }}
                </h3>
              </CardPost>
            </li>
          </ul>
        </div>
      </div>

      <div class="section__footer">
        <Button text="LOAD MORE" @click.native="loadMore($event)" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { GET_PAGINATED_POSTS } from '../graphql'
import Button from '../components/Button'
import CardPost from '../components/CardPost'

export default {
  name: 'News',
  components: {
    Button,
    CardPost
  },
  async fetch (init = false) {
    await this.$apollo.query({
      query: GET_PAGINATED_POSTS,
      fetchPolicy: 'no-cache',
      variables: {
        pagination: this.getPagination
      }
    })
      .then((response) => {
        this.posts.push(...response.data.posts)
        if (!init && response.data.posts.length < 6) {
          this.max = true
        }
      })
  },
  data () {
    return {
      max: false,
      pagination: {
        limit: 6,
        offset: 3
      },
      posts: []
    }
  },
  computed: {
    ...mapState(['isAuth', 'token']),
    getMax () { return this.max },
    getPagination () { return this.pagination },
    getPosts () { return this.posts }
  },
  methods: {
    loadMore (e) {
      e.preventDefault()
      if (!this.getMax) {
        this.pagination.offset += 6
        this.fetch()
      }
    },
    async fetch (init = false) {
      await this.$apollo.query({
        query: GET_PAGINATED_POSTS,
        fetchPolicy: 'no-cache',
        variables: {
          pagination: this.getPagination
        }
      })
        .then((response) => {
          this.posts.push(...response.data.posts)
          if (!init && response.data.posts.length < 6) {
            this.max = true
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.news {
  display: block;
}
.news__list {
  margin: 0 -24px;
}
.news__list-inner {
  position: relative;
}
.news__list-item {
  padding: 0 24px;
  margin-bottom: 60px;
}
.card-post__title {
  /* overflow: hidden; */
  /* width: 100%; */
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
}
</style>
