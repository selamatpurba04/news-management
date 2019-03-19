<template>
  <div class="CreateNews">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page"><a href="#" @click="redirect">Status</a></li>
        <li class="breadcrumb-item active" aria-current="page">Create</li>
      </ol>
    </nav>
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
import StatusServices from '@/services/StatusServices'
export default {
  name: 'CreateStatus',
  data () {
    return {
      title: '',
      description: '',
      errors:[]
    }
  },
  methods: {
    async submitStatus () {
      await StatusServices.submitStatus({
        title: this.title
      })
      this.$router.push({ name: 'Status' })
    },
    async redirect () {
      this.$router.push({ name: 'Status' })
    },
    checkForm:function(e) {
      if(this.title){
        this.submitStatus()
      }
      this.errors = [];
      if(!this.title) this.errors.push("Title required.")
      e.preventDefault()
    }
  }
}
</script>
