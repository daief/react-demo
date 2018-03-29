import Mock, { Random } from 'mockjs'
import API from './apiConfig'

const tryParse = (text) => {
  try {
    return JSON.parse(text)
  } catch (error) {
    console.warn('tryParse', error)
    return { }
  }
}

// 简单封装 Mock
const MyMock = (url, call) => {
  Mock.mock(url, (ops) => {
    const { url, type} = ops
    // ops.body 为字符串型的 json
    const body = tryParse(ops.body)
    const response = call({url, type, body})

    printMockInfo({url, body, response})
    
    return response
  })
}

function printMockInfo({url, body, response}) {
  // 打印 mock 信息
  console.group(`mock: ${url}`)
  console.log('body', body)
  console.log('response', response)
  console.groupEnd()
}

/*************** Mock Config ***************/
Mock.setup({
  timeout: '1000'
})

/*************** Random 自定义扩展 ***************/
Random.extend({
  constellation: () => {
    const constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return Random.pick(constellations)
  }
})

/*************** 拦截 url 返回 mock 数据 ***************/
MyMock(API.GET_USER, ({url, type, body}) => {
  // 回调函数 return 中无法使用数据模板和占位符
  // 增加一层嵌套以生效
  return Mock.mock({
    'code': '000000',
    'content': {
      // 属性名   name
      // 生成规则 rule
      // 属性值   value
      // 'name|rule': value
      'id|1-1000': 0,
      // 使用自定义 Random 扩展
      'constellation': '@constellation',
      // 使用内置 Random
      'name': '@cname',
    },
    'metadata': {},
    'status': 'success',
    'errors': []
  })
})
