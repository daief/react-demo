import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import { passiveSupported } from '../utils/browser';

const preventDefault = e => e.preventDefault()

export const preventScroll = () => {
  window.addEventListener('touchmove', preventDefault, passiveSupported ? { passive: false } : false)
}

export const recoverScroll = () => {
  window.removeEventListener('touchmove', preventDefault, passiveSupported ? { passive: false } : false)
}

export default class Singleton {
  constructor(component) {
    this.dom = null
    this.component = component
    this.instance = null
  }

  show = (option) => {
    if (!this.dom) {
      this.dom = document.createElement('div')
      document.body.appendChild(this.dom)
    }

    this.instance = render(<this.component {...option} />, this.dom)

    this.instance &&
      this.instance.setState({
        show: true,
      })
  }

  hide = () => {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        this.instance.setState({
          show: false,
        }, () => {
          window.setTimeout(() => {
            unmountComponentAtNode(this.dom)
            resolve()
          }, 100)
        })
      } else {
        reject()
      }
    })
  }
}
