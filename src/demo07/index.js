import React from 'react'

export default class Demo07 extends React.Component {
  render() {
    return (
      <div>
        <h3>most stars</h3>
        {/* 网络请求传入子组件 */}
        <Display
          promise={fetch('https://api.github.com/search/repositories?q=javascript&sort=stars')}
        ></Display>
      </div>
    )
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
      error: null
    }
  }

  // 一般在该周期函数中进行网络请求实例化
  componentDidMount() {
    this.props.promise.then(res => res.json())
      .then(value => this.setState({loading: false, data: value}))
      .catch(error => this.setState({loading: false, error: error}))
  }

  render() {
    return this.state.loading ? <span>Loading...</span> :
      this.state.error ? <span>{ this.state.error }</span> : (
        <div>
          {
            this.state.data.items.map((item, i) => {
              let {name, language, html_url} = item
              return (
                <section key={i} style={{border: '1px solid #ccc'}}>
                  <h3><a href={html_url}>{name}</a></h3>
                  <h4>{language}</h4>
                </section>
              )
            })
          }
        </div>
      )
  }
}