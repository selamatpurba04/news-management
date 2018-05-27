import Api from '@/services/Api'

export default {
  fetchStatusNews () {
    return Api().get('statusNews')
  }
}