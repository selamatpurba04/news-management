import Api from '@/services/Api'

export default {
  fetchStatus () {
    return Api().get('status')
  },
  getStatusById (params) {
  	return Api().get('status/' + params.id)
  },
  updateStatus (params) {
    return Api().put('status/' + params.id, params)
  },
  deleteStatus  (id) {
    return Api().delete('status/' + id)
  },
  submitStatus (params) {
    return Api().post('status', params)
  }
}