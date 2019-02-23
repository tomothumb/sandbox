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
              <label><input type="checkbox" name="js" :value="js_lib.id">
                <span>
                  {{ js_lib.label }} -
                </span>
                <a :href="js_lib.url">
                  {{ js_lib.url }}
                </a>
              </label>
            </li>
          </ul>

          <p>Products</p>
          <ul>
            <li v-for="product in products" :key="product.id">
              <span>
                {{ product.title }}
              </span>
            </li>
          </ul>
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
import sampleapi from '@/src/sampleapi'
export default {
  components: {
    // Logo
  },
  head() {
    return {
      title: 'HTML BUILDER'
    }
  },
  computed: {
    js_libs() {
      return this.$store.state.builders.js
    },
    products() {
      // return this.$store.state.builders.products
      return this.$store.getters['builders/availableProducts']
    }
  },
  created() {
    sampleapi.getProducts(products => {
      this.$store.commit('builders/setProducts', products)
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
