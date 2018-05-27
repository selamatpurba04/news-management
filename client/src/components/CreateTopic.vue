<template>
  <div class="CreateNews">
    <div class="py-3 text-center">
      <h2>Create Topic</h2>
    </div>
    <form @submit="checkForm">
      <div class="row">
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
              </div>

              <div class="col-md-12 mb-3">
                <label for="description">Description</label>
                <textarea type="description" class="form-control" id="description" v-model="description" rows="2"></textarea>
                <div class="invalid-feedback">
                  Please enter a valid description address for shipping updates.
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
import TopicServices from '@/services/TopicServices'
export default {
  name: 'CreateTopic',
  data () {
    return {
      title: '',
      description: '',
      errors:[]
    }
  },
  methods: {
    async submitTopic () {
      await TopicServices.submitTopic({
        title: this.title,
        description: this.description
      })
      this.$router.push({ name: 'Topic' })
    },
    async redirect () {
      this.$router.push({ name: 'Topic' })
    },
    checkForm:function(e) {
      if(this.title && this.description){
        this.submitTopic()
      }
      this.errors = [];
      if(!this.title) this.errors.push("Title required.")
      if(!this.description) this.errors.push("Description required.")
      e.preventDefault()
    }
  }
}
</script>
