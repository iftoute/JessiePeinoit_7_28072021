import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit
        console.log(userInfos)
        instance.post('/user/login', userInfos)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
      })
    },
    signup: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit
        console.log(userInfos)
        instance.post('/user/signup', userInfos)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
