import React from 'react'
import store from './store'
import API from './apiConfig'


export default class Demo12 extends React.Component {
  state = {
    content: {},
    user: {}
  }

  componentDidMount() {
    
  }

  getUser = () => {
    store.getData(API.GET_USER, {
      id: 1
    }).then(({ body }) => {
      if (body.status === 'success') {
        this.setState({
          user: body.content
        })
      }
    })
  }

  render() {
    return (
      <div>
        demo12
        <div>
          <button onClick={this.getUser}>GET USER</button>
          <div>
            { JSON.stringify(this.state.user) }
          </div>
        </div>
      </div>
    )
  }
}