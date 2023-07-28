import { createStore } from 'vuex'
export default createStore({
    state: {
        likes: 1,
        isAuth: true
    },
    getters: {
        doubleLikes(state) {
            return state.likes * 1
        }
    },
    mutations: {
        incrementLikes(state) {
            return state.likes += 1
        },
        decrementLikes(state) {
            return state.likes -= 1
        }

    },
    actions: {},
    modules: {}
})