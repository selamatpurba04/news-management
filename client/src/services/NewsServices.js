import Api from '@/services/Api'

export default {
  fetchNews () {
    return Api().get('news')
  },
  submitNews (params) {
    return Api().post('news', params)
  },
  getNewsById (params) {
  	return Api().get('news/' + params.id)
  },
  updateNews (params) {
  	return Api().put('news/' + params.id, params)
  },
  deleteNews (id) {
    return Api().delete('news/' + id)
  },
  filterByStatus (id) {
  	return Api().get('news/status/' + id)
  },
  filterByTopic (id) {
  	return Api().get('news/topic/' + id)
  },
  filterNews (params) {
  	return Api().post('news/filter/', params)
  },
}
