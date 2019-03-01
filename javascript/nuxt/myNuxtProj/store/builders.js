import sampleapi from '@/src/sampleapi'

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
  products: [],
  todoList: []
})

export const getters = {
  availableProducts(state, getters) {
    return state.products.filter(product => product.inventory > 0)
  },
  todoList(state, getters) {
    return state.todolist
  }
}

export const actions = {
  fetchProducts(context) {
    return new Promise((resolve, reject) => {
      sampleapi.getProducts(products => {
        context.commit('setProducts', products)
        resolve()
      })
    })
  },
  addTodo(context, value) {
    console.log(1,value)
    context.commit('add', value)
  }
}

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },
  add(state, text) {
    state.todoList.push({
      text: text,
      done: false,
      id: state.todoList.length + 1
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
