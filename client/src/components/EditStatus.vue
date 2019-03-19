<template>
  <div class="CreateNews">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page"><a href="#" @click="redirect">Status</a></li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
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
import StatusServices from '@/services/StatusServices'
export default {
  name: 'EditStatus',
  data () {
    return {
      title: '',
      description: '',
      errors: []

    }
  },
  mounted () {
    this.getStatusById()
  },
  methods: {
    async updateStatus () {
      await StatusServices.updateStatus({
        id: this.$route.params.id,
        title: this.title
      })
      this.$router.push({ name: 'Status' })
    },
    async getStatusById () {
      const response = await StatusServices.getStatusById({
        id: this.$route.params.id
      })
      this.title = response.data.title
    },
    redirect () {
      this.$router.push({ name: 'Status' })
    },
    checkForm:function(e) {
      if(this.title){
        this.updateStatus()
      }
      this.errors = [];
      if(!this.title) this.errors.push("Title required.")
      e.preventDefault()
    }
  }
}
</script>
