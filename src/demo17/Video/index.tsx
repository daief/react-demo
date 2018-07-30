import * as React from 'react'
import './video.scss'

interface VideoProps {
  src: string
  controls?: boolean
  playsInline?: boolean
  preload?: 'auto' | 'metadata' | 'none'
}

export default class Video extends React.Component<VideoProps> {
  static defaultProps = {
    controls: true,
    playsInline: true,
    preload: 'metadata',
  }

  render() {
    const {src, controls, playsInline, preload} = this.props
    return (
      <div className="__video">
        <video
          controls={controls}
          playsInline={playsInline}
          preload={preload}
          src={src}>
        </video>
      </div>
    )
  }
}