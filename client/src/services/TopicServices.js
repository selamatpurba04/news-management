import Api from '@/services/Api'

export default {
  fetchTopic () {
    return Api().get('topic')
  },
  submitTopic (params) {
    return Api().post('topic', params)
  },
  getTopicById (params) {
  	return Api().get('topic/' + params.id)
  },
  updateTopic (params) {
  	return Api().put('topic/' + params.id, params)
  },
  deleteTopic (id) {
    return Api().delete('topic/' + id)
  },
}