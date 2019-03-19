<template>
  <div class="news">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Status</li>
      </ol>
    </nav>
    <div class="row mb-3">
      <div class="col-md-6">
        <router-link v-bind:to="{ name: 'CreateStatus' }" class="btn btn-sm">Add</router-link>
      </div>
    </div>
    <table class="table">
      <tr>
        <th>Title</th>
        <th width="200" class="text-center">Action</th>
      </tr>
      <tr v-for="s in status">
        <td>{{ s.title }}</td>
        <td class="text-center">
          <router-link v-bind:to="{ name: 'EditStatus', params: { id: s._id } }" class="btn btn-sm">Edit</router-link> |
          <a href="#" @click.prevent="deleteStatus(s._id)" class="btn btn-sm">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import StatusServices from '@/services/StatusServices'

export default {
  name: 'Status',
  data () {
    return {
      status: []
    }
  },
  mounted () {
    this.getStatus()
  },
  methods: {
    async deleteStatus (id) {
      const response = await StatusServices.deleteStatus(id)
      if( response.data.success ){
        this.getStatus()
      }
    },
    async getStatus () {
      const response = await StatusServices.fetchStatus()
      this.status = response.data.status
    }
  }
}
</script>
