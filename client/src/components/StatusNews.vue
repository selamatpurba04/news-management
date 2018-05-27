<template>
  <div class="news">
    <div class="py-3 text-center">
      <h2>Status News</h2>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <router-link v-bind:to="{ name: 'CreateStatusNews' }" class="btn btn-sm">Add Status News</router-link>
      </div>
    </div>
    <table class="table">
      <tr>
        <th>Title</th>
        <th width="200" class="text-center">Action</th>
      </tr>
      <tr v-for="s in statusNews">
        <td>{{ s.title }}</td>
        <td class="text-center">
          <router-link v-bind:to="{ name: 'EditStatusNews', params: { id: s._id } }" class="btn btn-sm">Edit</router-link> |
          <a href="#" @click.prevent="deleteStatusNews(s._id)" class="btn btn-sm">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import StatusNewsServices from '@/services/StatusNewsServices'

export default {
  name: 'StatusNews',
  data () {
    return {
      statusNews: []
    }
  },
  mounted () {
    this.getStatusNews()
  },
  methods: {
    async deleteStatusNews (id) {
      const response = await StatusNewsServices.deleteStatusNews(id)
      if( response.data.success ){
        this.getStatusNews()
      }
    },
    async getStatusNews () {
      const response = await StatusNewsServices.fetchStatusNews()
      console.log(response)
      this.statusNews = response.data.statusNews
    }
  }
}
</script>
