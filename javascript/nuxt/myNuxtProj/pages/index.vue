<template>
  <section class="container">
    <div>
      <NavBar />
      <logo />
      <h1 class="title">
        myNuxtProj aaaa
      </h1>
      <h2 class="subtitle">
        My glorious Nuxt.js project
      </h2>
      <h3>POSTS</h3>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <nuxt-link :to="`/user/${post.id}`">
            {{post.title}}
          </nuxt-link>
        </li>

      </ul>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar,
    Logo
  },
  head() {
    return {
      title: 'Home Page',
      meta: [
        { name: 'twitter:title', content: 'sample' },
        { name: 'twitter:description', content: 'sample page' },
        { name: 'twitter:image', content: 'https://i.imgur.com/UYP2umJ.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts.all
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
