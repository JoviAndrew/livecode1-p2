<template>
  <div class="home">
    <h3>Start using app!</h3>
    <input type="text" placeholder="Email" v-model="email">
    <input type="text" placeholder="Name" v-model="name">
    <button @click="requestToken">Submit</button>
    <div class="row mt-3">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <h3>Upload Image</h3>
        <input type="file" @change="onFilePicked" ref="file" accept="image/*">
        <button @click="uploadImage">Upload</button>
        <button @click="getAllPhotos">Get Photos</button>
      </div>
      <div class="col-lg-3"></div>
    </div>
    <div class="row mt-5">
      <div class="col-2"></div>
      <div class="col-8">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Image</th>
              <th scope="col">Uploaded By</th>
              <th scope="col">Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(image, index) in images" :key="index">
              <th scope="row">{{index}}</th>
              <td><img :src="image.url"></td>
              <td>{{image.user.name}}</td>
              <td>{{image.createdAt}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      email: '',
      name: '',
      file: ''
    }
  },
  computed: {
    ...mapState([
      'token',
      'images'
    ])
  },
  methods: {
    requestToken () {
      let userData = {
        email: this.email,
        name: this.name
      }
      this.$store.dispatch('getToken', userData)
    },
    onFilePicked () {
      this.file = this.$refs.file.files[0]
    },
    uploadImage () {
      let formData = new FormData()
      formData.append('photo', this.file)
      this.$store.dispatch('uploadImage', formData)      
    },
    getAllPhotos () {
      this.$store.dispatch('getAllImage')
    }
  }
}
</script>

<style scoped>
  img{
    height: 10rem;
    width: auto;
  }
</style>
