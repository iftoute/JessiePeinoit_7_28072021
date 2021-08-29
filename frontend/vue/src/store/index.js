import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    email: '',
    token: ''
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      email: '',
      token: ''
    };
  }
}

export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      email: '',
      isAdmin: '',
      userName: '',
      imageUrl: '',
      token: ''
    },
    userInfos: {
      userName: '',
      email: '',
      imageUrl: ''
    }

  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        email: '',
        token: ''  
      }
      localStorage.removeItem('user');
    }
  },
  actions: {  
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/user/login', userInfos)
        .then(function(response) {
          commit('setStatus', '')
          commit('logUser', response.data)
          resolve(response);
        })
        .catch(function(error) {
          commit('setStatus', 'error_login')
          reject(error);
        });  
      })
    },
    signup: ({commit}, userInfos) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/user/signup', userInfos)
        .then(function(response) {
          commit('setStatus', 'signedup')
          resolve(response);

        })
        .catch(function(error) {
          commit('setStatus', 'error_signup')
          reject(error);
        });  
      })
    },
    getUserInfos: ({commit}) => {
      axios.get('http://localhost:3000/api/user/:id')
      .then(function(response) {
        console.log(response);
        commit('userInfos', response.data.user)

      })
      .catch(function(error) {
        console.log(error);
      });  

    },
  
      
        
  // getUserInfos: async function getUserProfile() {
  //   axios.get('http://localhost:3000/api//user/:id')
  //     .then(function(response) {
  //       console.log(response);
  //     })
  //   } .catch (function(error) {
  //     console.log(error)
  //   })
  // },
      
    }  
})