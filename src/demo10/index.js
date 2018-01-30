import './index.scss'
import Hammer from 'react-hammerjs'
import React from 'react'
import Logo from '../react.svg'

const WIDTH = window.innerWidth

const options = {
  recognizers: {
    pinch: { enable: true }
  }
}

export default class Demo10 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scale: 1,
      currentPage: 0,
      pageOffsex: 0
    }

    this.panStartX = 0
    this.distanceOffset = 0
    this.timer = null
  }

  componentWillMount() {
    
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  panStartHandle = (e) => {
    this.panStartX = e.center.x
  }

  panHandle = (e) => {
    let distance = e.center.x - this.panStartX
    this.setState({
      pageOffsex: distance
    })
  }

  panEndHandle = (e) => {
    let distance = e.center.x - this.panStartX
    if (distance > 0.2 * WIDTH) {
      let page = (this.state.currentPage  + 2) % 3
      this.setState({
        currentPage: page,
        pageOffsex: 0
      })
    } else if (distance < - 0.2 * WIDTH) {
      this.pageAnimate()
    } else {
      this.setState({
        pageOffsex: 0
      })
    }
  }

  pageAnimate = () => {
    if (WIDTH + this.state.pageOffsex > 0) {
      let nset = this.state.pageOffsex - 20
      nset = nset + WIDTH > 0 ? nset : - WIDTH
      this.setState({
        pageOffsex: nset
      })
      setTimeout(this.pageAnimate, 16)
    } else {
      let page = (this.state.currentPage  + 1) % 3
      this.setState({
        currentPage: page,
        pageOffsex: 0
      })
    }
  }

  render() {
    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=644701570,1471147815&fm=27&gp=0.jpg',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1516891756,2194615571&fm=27&gp=0.jpg'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1665207864,746409922&fm=27&gp=0.jpg'
      }
    ]

    let translateX = - this.state.currentPage * WIDTH + this.state.pageOffsex

    return (
      <div className="demo10">
        <Hammer
          onPanStart={this.panStartHandle}
          onPan={this.panHandle}
          onPanEnd={this.panEndHandle}
        >
          <div className="list" style={{width: WIDTH * 3, transform: `translateX(${translateX}px)`}}>
            {
              images.map((img, idx) => {
                return <div className="item" key={idx} style={{width: WIDTH}}>
                  <img src={img.thumbnail}/>
                </div>
              })
            }
          </div>
        </Hammer>
      </div>
    )
  }
}