<template>
  <div class="home">
    <div class="row head">
      <div class="col-lg-3"></div>
      <div class="userBody col-lg-6">
        <h3>Create or Login User</h3>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="">Email</span>
              </div>
              <input type="text" class="form-control" v-model="email">
            </div>
            <div class="input-group mt-2">
              <div class="input-group-prepend">
                <span class="input-group-text" id="">Name</span>
              </div>
              <input type="text" class="form-control" v-model="name">
            </div>
            <button class="btn btn-outline-primary mt-2" @click="requestToken">Submit</button>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-3"></div>
      <div class="uploadImage col-lg-6">
        <h3>Upload Image</h3>
        <div class="row mt-3">
          <div class="col-lg-3"></div>
          <div class="col-lg-6">
            <input class="btn btn-outline-primary" type="file" @change="onFilePicked" ref="file" accept="image/*">
            <button class="btn btn-warning m-2" @click="uploadImage">Upload</button>
            <button class="btn btn-success m-2" @click="getAllPhotos">Get Photos</button>
          </div>
          <div class="col-lg-3"></div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
    <div class="row mt-5">
      <div class="col-2"></div>
      <div class="col-8">
        <h3>Uploaded Images</h3>
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
              <th scope="row">{{index + 1}}</th>
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
  .userBody{
    display: flex;
    flex-direction: column;
    padding: 3% 0%;
    border: 1px solid rgb(153, 211, 250)
  }
  img{
    height: 10rem;
    width: auto;
  }
  .uploadImage {
    display: flex;
    flex-direction: column;
    margin: 3% 0%;
    padding: 3% 0%;
    border: 1px solid rgb(153, 211, 250)
  }
</style>
