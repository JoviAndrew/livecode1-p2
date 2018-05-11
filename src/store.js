import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    images: []
  },
  mutations: {
    setToken (state, token){
      state.token = token
    },
    setImages (state, imageData) {
      state.images = imageData
    }
  },
  actions: {
    getToken ({commit}, userData) {
      if(userData.email === ''){
        alert('email is required')
      }else if(userData.name === ''){
        alert('name is required')
      }else{
        axios.post('http://35.198.212.156/request-token', {email: userData.email, name: userData.name})
        .then(function(response){
          alert('success create new user')
          commit('setToken', response.data.user.uid)
        })
        .catch(function(err){
          alert(err)
        })
      }
    },
    uploadImage ({state, dispatch}, formData) {
      let token = state.token
      if(token === ''){
        alert('authorization token is required')
      }else{
        axios.post('http://35.198.212.156/api/image', formData, {headers: {authorization: token}})
        .then(function(response){
          alert('success upload photo')
          dispatch('getAllImage')
        })
        .catch(function(err){
          alert(err)
        })
      }
    },
    getAllImage ({commit, state}) {
      let token = state.token
      if(token === ''){
        alert('authorization token is required')
      }else{
        axios.get('http://35.198.212.156/api/image', {headers: {authorization: token}})
        .then(function(imageData){
          commit('setImages', imageData.data.images)
        })
        .catch(function(err){
          console.log(err)
        })
      }
    }
  }
})
