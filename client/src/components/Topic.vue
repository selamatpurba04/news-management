<template>
  <div class="news">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Topic</li>
      </ol>
    </nav>
    <div class="row mb-3">
      <div class="col-md-6">
        <router-link v-bind:to="{ name: 'CreateTopic' }" class="btn btn-sm">Add</router-link>
      </div>
    </div>
    <table class="table">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th width="200" class="text-center">Action</th>
      </tr>
      <tr v-for="t in topics">
        <td>{{ t.title }}</td>
        <td>{{ t.description }}</td>
        <td class="text-center">
          <router-link v-bind:to="{ name: 'EditTopic', params: { id: t._id } }" class="btn btn-sm">Edit</router-link> |
          <a href="#" @click.prevent="deleteTopic(t._id)" class="btn btn-sm">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import TopicServices from '@/services/TopicServices'

export default {
  name: 'Topic',
  data () {
    return {
      topic: [],
      topics: [],
      statusNews: [],
      idStatus: '',
      idTopics: ''
    }
  },
  mounted () {
    this.getTopics()
  },
  methods: {
    async deleteTopic (id) {
      const response = await TopicServices.deleteTopic(id)
      if( response.data.success ){
        this.getTopics()
      }
    },
    async getTopics () {
      const response = await TopicServices.fetchTopic()
      this.topics = response.data.topic
    }
  }
}
</script>
