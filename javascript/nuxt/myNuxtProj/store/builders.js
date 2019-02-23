export const state = () => ({
  js: [
    {
      id: 'fader',
      label: 'Fader',
      url: 'https://example.com/fader'
    },
    {
      id: 'cross_fader',
      label: 'Cross Fader',
      url: 'https://example.com/cross_fader'
    },
    {
      id: 'sticky_toc',
      label: 'Sticky TOC',
      url: 'https://example.com/sticky_toc'
    }
  ],
  products: []
})

export const getters = () => ({
  productsCount() {}
})

export const actions = () => ({
  fetchProducts() {}
})

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  }
}
