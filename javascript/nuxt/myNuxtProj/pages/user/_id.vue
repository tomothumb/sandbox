<template>
  <section class="container">
    <NavBar />
    <div>
      <h1 class="title">
        {{ post.title }}
      </h1>
      <p>{{ post.content }}</p>
      <nav>
        <h3>posts you might need</h3>
        <ul>
          <li v-for="(related, key, index) in relatedPosts" :key="index">
            <a :href="`/user/${related.id}`">{{ related.title }}</a>
            <nuxt-link :to="`/user/${related.id}`">
              {{ related.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { name: 'twitter:title', content: this.post.title },
        { name: 'twitter:description', content: this.post.content },
        { name: 'twitter:image', content: 'https://i.imgur.com/UYP2umJ.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },

  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    post() {
      return this.$store.state.posts.all.find(post => post.id === this.id)
    },
    relatedPosts() {
      return this.$store.state.posts.all.filter(post => post.id !== this.id)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
