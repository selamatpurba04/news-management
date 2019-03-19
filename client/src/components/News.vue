<template>
  <div class="news">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">News</li>
      </ol>
    </nav>
    <div class="row mb-3">
      <div class="col-md-6">
        <router-link v-bind:to="{ name: 'CreateNews' }" class="btn btn-sm">Add</router-link>
      </div>
      <div class="col-md-3">
        <select v-on:change="filterNews" v-model="idTopics" class="form-control">
          <option value="">Filter Topic</option>
          <option v-for="t in Topics" v-bind:value="t._id">{{ t.title }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-on:change="filterNews" v-model="idStatus" class="form-control">
          <option value="">Filter Status</option>
          <option v-for="s in status" :value="s._id">{{ s.title }}</option>
        </select>
      </div>
    </div>
    <table class="table">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th width="200" class="text-center">Action</th>
      </tr>
      <tr v-for="n in news">
        <td>{{ n.title }}</td>
        <td>{{ n.description }}</td>
        <td v-if='n.idStatus'>{{ n.idStatus.title }}</td><td v-else>Draft</td>
        <td class="text-center">
          <router-link v-bind:to="{ name: 'EditNews', params: { id: n._id } }" class="btn btn-sm">Edit</router-link> |
          <a href="#" @click.prevent="deleteNews(n._id)" class="btn btn-sm">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import NewsServices from '@/services/NewsServices'
import TopicServices from '@/services/TopicServices'
import StatusServices from '@/services/StatusServices'

export default {
  name: 'News',
  data () {
    return {
      news: [],
      Topics: [],
      status: [],
      idStatus: '',
      idTopics: ''
    }
  },
  mounted () {
    this.getNews()
    this.getTopics()
    this.getStatus()
  },
  methods: {
    async getNews () {
      const response = await NewsServices.fetchNews()
      this.news = response.data.news
    },
    async deleteNews (id) {
      const response = await NewsServices.deleteNews(id)
      if( response.data.success ){
        this.getNews()
      }
    },
    async getTopics () {
      const response = await TopicServices.fetchTopic()
      this.Topics = response.data.topic
    },
    async getStatus () {
      const response = await StatusServices.fetchStatus()
      this.status = response.data.status
    },
    async filterNews () {
      const response = await NewsServices.filterNews({
        idStatus :  this.idStatus,
        idTopics : this.idTopics
      })
      this.news = response.data.news
    }
  }
}
</script>
