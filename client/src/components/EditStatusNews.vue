<template>
  <div class="CreateNews">
    <div class="py-3 text-center">
      <h2>Edit Status News</h2>
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
import StatusNewsServices from '@/services/StatusNewsServices'
export default {
  name: 'EditStatusNews',
  data () {
    return {
      title: '',
      description: '',
      errors: []

    }
  },
  mounted () {
    this.getStatusNewsById()
  },
  methods: {
    async updateStatusNews () {
      await StatusNewsServices.updateStatusNews({
        id: this.$route.params.id,
        title: this.title
      })
      this.$router.push({ name: 'StatusNews' })
    },
    async getStatusNewsById () {
      const response = await StatusNewsServices.getStatusNewsById({
        id: this.$route.params.id
      })
      this.title = response.data.statusNews.title
    },
    redirect () {
      this.$router.push({ name: 'StatusNews' })
    },
    checkForm:function(e) {
      if(this.title){
        this.updateStatusNews()
      }
      this.errors = [];
      if(!this.title) this.errors.push("Title required.")
      e.preventDefault()
    }
  }
}
</script>
