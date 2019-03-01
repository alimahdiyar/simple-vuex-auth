import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
  state: {
    api_token: localStorage.getItem('token'),
  },
  getters: {
    api_token: state => {
      return state.api_token;
    },
    isAuthenticated: state => {
      return state.api_token !== null;
    }
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.api_token = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      state.api_token = null;
    }
  },
  actions: {

    login (context, credentials) {
      return new Promise((resolve, reject) => {

        axios
        .post('http://cse-shirazu.ir/api/v1/user/api-token-auth/', 
        credentials)
        .then(response => {
          context.commit("updateToken", response.data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });

      })
    },

    logout (context) {
      context.commit('removeToken')
    }
    
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})