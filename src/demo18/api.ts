export const ApiMap: {
  [key: string]: string
} = {
  // normal
  booklist: '/api/booklist',

  // resful
  userList: '/api/user/${teacher|student}/page/${offset}/${limit}',
  orderBook: '/api/order/book/${id}',
}

export const getReqUrl = (name: string): string => {
  if (ApiMap[name]) return ApiMap[name]
  else throw new Error('no such api')
}
