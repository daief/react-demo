import nanoajax from 'nanoajax'
import queryString from 'query-string'

export function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

function tryParse(text) {
  try {
    return JSON.parse(text)
  } catch (_) {
    return text
  }
}

/**
 * get
 *
 * @name get
 * @function
 * @author Timothy
 * @date 2017-05-22
 * @param {string} url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise}
 */
function get(url, params, config) {
  if (!url) {
    return '参数url不能为空'
  }

  const { headers, ...oldConfig } = config || {}

  const newConfig = Object.assign(
    {
      method: 'GET',
      headers: Object.assign(
        {
          'Content-Type': 'application/json',
        },
        headers,
      ),
      cors: true, // 是否支持跨域请求
      timeout: 6000, // 默认请求超时时间
      responseType: 'text', // 默认返回数据类型，浏览器根据类型自动格式化
    },
    oldConfig,
  )

  return new Promise((resolve, reject) => {
    const newURL = params ? `${url}?${queryString.stringify(params)}` : url
    try {
      nanoajax.ajax(
        {
          url: newURL,
          ...newConfig,
        },
        (code, body, req) => {
          if (code >= 200 && code < 300) {
            resolve({ code, body: tryParse(body), req, config: newConfig })
          } else {
            reject({
              code,
              body: tryParse(body),
              req,
              config: newConfig,
              error: new Error('Server error'),
            })
          }
        },
      )
    } catch (e) {
      reject({ error: e })
    }
  })
}

function post(url, body, config) {
  if (!url) {
    return '参数url不能为空'
  }

  const { params, headers, ...oldConfig } = config || {}

  const newConfig = Object.assign(
    {
      method: 'POST',
      headers: headers || {},
      cors: true, // 是否支持跨域请求
      timeout: 6000, // 默认请求超时时间
      responseType: 'text', // 默认返回数据类型，浏览器根据类型自动格式化
    },
    oldConfig,
  )

  let data
  if (
    newConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    data = queryString.stringify(body)
  } else if (typeof body === 'object' && typeof body.append === 'function') {
    data = body
  } else {
    newConfig.headers['Content-Type'] === 'application/json'
    data = JSON.stringify(body)
  }

  return new Promise((resolve, reject) => {
    const newURL = params ? `${url}?${queryString.stringify(params)}` : url
    try {
      nanoajax.ajax(
        {
          url: newURL,
          body: data,
          ...newConfig,
        },
        (code, body, req) => {
          if (code >= 200 && code < 300) {
            resolve({ code, body: tryParse(body), req, config: newConfig })
          } else {
            reject({
              code,
              body: tryParse(body),
              req,
              config: newConfig,
              error: new Error('Server error'),
            })
          }
        },
      )
    } catch (e) {
      reject({ error: e })
    }
  })
}

export default {
  get,
  post,
}
