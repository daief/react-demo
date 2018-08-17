import * as React from 'react'
import {Server, RestfulServer} from './services'

// GET /api/booklist
Server.getBooklist();
// GET /api/user/teacher/page/10/10
RestfulServer.getUserList('teacher', 10, 10);
// POST /api/order/book/1
RestfulServer.postOrderBook(1);

export default class Demo18 extends React.Component<any, any> {
  render() {
    return (
      <div>
        demo18 InversifyJS
      </div>
    )
  }
}