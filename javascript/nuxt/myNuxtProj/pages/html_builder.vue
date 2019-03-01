<template>
  <section class="container">
    <div>
      <h1 class="title">
        HTML Builder
      </h1>



      <form action="#">
        <fieldset>
          <legend>BUILDER</legend>
          <ul>
            <li v-for="js_lib in js_libs" :key="js_lib.id">
              <button
                v-on:click="$store.dispatch('builders/addTodo', js_lib.id)"
              >追加</button>
              <span>
                  {{ js_lib.label }} -
                </span>

              <a :href="js_lib.url">
                {{ js_lib.url }}
              </a>
              <input type="checkbox" name="js" :value="js_lib.id">
            </li>
          </ul>

          <img src="https://i.imgur.com/JfPpwOA.gif" alt="" v-if="loading">
          <div v-else>
            <p>Products</p>
            <ul>
              <li v-for="product in products" :key="product.id">
                <span>
                  {{ product.title }}
                </span>
              </li>
            </ul>

            <h3>List</h3>
            <ul>
              <li v-for="todo in todolists" :key="todo.id">

                <span>
                  {{ todo.text }}
                </span>
              </li>
            </ul>
          </div>
        </fieldset>
      </form>

      <pre>
        aaaaaaa
      </pre>
    </div>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
export default {
  components: {
    // Logo
  },
  head() {
    return {
      title: 'HTML BUILDER'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    js_libs() {
      return this.$store.state.builders.js
    },
    products() {
      // return this.$store.state.builders.products
      return this.$store.getters['builders/availableProducts']
    },
    todolists() {
      // return this.$store.state.builders.products
      return this.$store.getters['builders/todoList']
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('builders/fetchProducts').then(() => {
      this.loading = false
    })
  }
}
</script>

<style scoped>
body {
  padding: 20px;
}
fieldset {
  margin: 20px;
}
pre {
  margin: 20px;
  width: 80%;
  height: 500px;
  border: 1px solid #cccccc;
}
</style>
