<template>
  <section class="container">
    <NavBar />
    <div>
      <h1 class="title">{{post.title}}</h1>
      <p>{{post.content}}</p>
      <nav>
        <h3>posts you might need</h3>
        <ul>
          <li v-for="(related, key, index) in relatedPosts" :key="index">
            <a :href="`/user/${related.id}`">{{related.title}}</a>
            <nuxt-link :to="`/user/${related.id}`">
              {{related.title}}
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

  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      id: this.$route.params.id,
      posts: [
        {
          id: '1',
          title: 'What is Balut?',
          content:
            'If someone placed balut on your plate, you might think they were serving you a hardboiled egg. That is, until you cracked it open and a fully intact duck embryo spilled out. Balut, considered a delicacy in many Asian countries, is produced when fertilized duck eggs are placed in warm sunlight. After about eight days, the eggs are held up to the light and checked to ensure that the budding embryo is ready. Then, the eggs are cooked and served with a dash of salt and a few squirts of lemon juice.'
        },
        {
          id: '2',
          title: 'Where is the sign in button??',
          content:
            "I've stalked the forum for a while, reading everything closely, but today I decided that it was time to register as a user. So I did, this morning! But now, when I came back to the forum, I cannot seem to find the damn sign in button? WHERE IS IT???!??"
        },
        {
          id: '3',
          title: 'How can I fix this problem?',
          content:
            'Please help me. I dont know what is the best way to fix my problem. I cant reproduce and I cant tell more info. Can someone help me asap??? I am in a hurry!!!'
        }
      ]
    }
  },
  computed: {
    post() {
      return this.posts.find(post => post.id === this.id)
    },
    relatedPosts() {
      return this.posts.filter(post => post.id !== this.id)
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
