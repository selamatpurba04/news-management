<template>
  <div class="CreateNews">
    <div class="py-3 text-center">
      <h2>Create Status News</h2>
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
  name: 'CreateStatusNews',
  data () {
    return {
      title: '',
      description: '',
      errors:[]
    }
  },
  methods: {
    async submitStatusNews () {
      await StatusNewsServices.submitStatusNews({
        title: this.title
      })
      this.$router.push({ name: 'StatusNews' })
    },
    async redirect () {
      this.$router.push({ name: 'StatusNews' })
    },
    checkForm:function(e) {
      if(this.title){
        this.submitStatusNews()
      }
      this.errors = [];
      if(!this.title) this.errors.push("Title required.")
      e.preventDefault()
    }
  }
}
</script>
