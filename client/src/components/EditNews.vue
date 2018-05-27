<template>
  <div class="CreateNews">
    <div class="py-3 text-center">
      <h2>Edit News</h2>
    </div>
    <form @submit="checkForm">
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <label class="d-flex justify-content-between align-items-center mb-2">Topics</label>
          <div style="max-height:300px; overflow-y:scroll;">
            <ul class="list-group mb-3" v-for="(t,i) in Topics">
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <label :for="'checkbox_' + i ">
                  <h6 class="my-0">{{ t.title }}</h6>
                  <small class="">{{ t.description }}</small>
                </label>
                <span class="text-muted"><input type="checkbox" v-model="idTopics" v-bind:value="t._id" :id="'checkbox_' + i "></span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-8 order-md-1">

            <div class="row">

              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </p>

              <div class="col-md-12 mb-3">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" placeholder="" value="" v-model="title">
                <div class="invalid-feedback">
                  Valid title is required.
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <label for="description">Description</label>
                <textarea type="description" class="form-control" id="description" v-model="description" rows="5"></textarea>
                <div class="invalid-feedback">
                  Please enter a valid description address for shipping updates.
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <label for="idStatus">Status</label>
                <div v-for="(s, i) in statusNews">
                  <input type="radio" v-bind:value="s._id" :id="'radio_' + i" v-model="idStatus"> 
                  <label :for="'radio_' + i"> {{ s.title }} </label>
                </div>
                
                <div class="invalid-feedback">
                  Valid title is required.
                </div>
              </div>
            </div>

            <hr class="mb-4">
            <div class="row">
              <div class="col-md-6">
                <a class="btn btn-md btn-block d-inline-block" @click="redirect">Cancel</a> 
              </div>
              <div class="col-md-6">
                <button class="btn btn-primary btn-md btn-block" type="submit">Submit</button>
              </div>
            </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import NewsServices from '@/services/NewsServices'
import StatusNewsServices from '@/services/StatusNewsServices'
import TopicServices from '@/services/TopicServices'
export default {
  name: 'EditNews',
  data () {
    return {
      title: '',
      description: '',
      idStatus: '',
      idTopics: [],
      statusNews : [],
      Topics : [],
      errors: []

    }
  },
  mounted () {
    this.getNewsById()
    this.getStatusNews()
    this.getTopics()
  },
  methods: {
    async updateNews () {
      await NewsServices.updateNews({
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        idStatus: this.idStatus,
        idTopics: this.idTopics
      })
      this.$router.push({ name: 'News' })
    },
    async getNewsById () {
      const response = await NewsServices.getNewsById({
        id: this.$route.params.id
      })
      console.log(response);
      this.title = response.data.news.title
      this.description = response.data.news.description
      this.idStatus = response.data.news.idStatus
      this.idTopics = response.data.news.idTopics
    },
    async getStatusNews () {
      const response = await StatusNewsServices.fetchStatusNews()
      this.statusNews = response.data.statusNews
    },
    async getTopics () {
      const response = await TopicServices.fetchTopic()
      this.Topics = response.data.topic
    },
    async redirect () {
      this.$router.push({ name: 'News' })
    },
    checkForm:function(e) {
      if(this.title && this.description && this.idStatus && this.idTopics.length > 0){
        this.updateNews()
      }
      this.errors = [];
      if(!this.title) this.errors.push("Title required.")
      if(!this.description) this.errors.push("Description required.")
      if(!this.idStatus) this.errors.push("Status required.")
      if(this.idTopics.length == 0) this.errors.push("Topics required.")
      e.preventDefault()
    }
  }
}
</script>
