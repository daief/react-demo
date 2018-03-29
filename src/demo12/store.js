import http from 'utils/http'
import './mock'

class Store {
  getData = (url, params) => {
    return http.post(url, {...params}, {
      // config
      header: {
        'Content-Type': 'application/json'
      }
    }).catch(() => {
      return { body: {} }
    })
  }
}

export default new Store()