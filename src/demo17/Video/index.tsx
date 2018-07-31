import * as React from 'react'
import './video.scss'

interface VideoProps {
  autoplay?: boolean
  controls?: boolean
  height?: number
  loop?: boolean
  // 规定视频的音频输出应该被静音
  muted?: boolean
  poster?: string
  preload?: 'auto' | 'metadata' | 'none'
  src: string
  width?: number

  ref?: Function
}

type EventVideo = React.SyntheticEvent<HTMLVideoElement>

export default class Video extends React.Component<VideoProps> {
  static defaultProps = {
    autoplay: false,
    controls: false,
    loop: false,
    muted: false,
    preload: 'metadata',
  }

  componentDidMount() {
    // this.props.ref(this)
    // console.log(this.props.ref)
  }

  events = {
    playing: (e: EventVideo) => {
      console.log({...e})
    },
    timeUpdate: (e: EventVideo) => {
      console.log('timeupdate', e)
    },
  }

  render() {
    const {src, controls, preload} = this.props
    const {playing, timeUpdate} = this.events
    return (
      <div className="__video">
        <video
          controls={controls}
          preload={preload}
          src={src}
          // event
          onPlaying={playing}
          onTimeUpdate={timeUpdate}

        >
        </video>
        <div className="controls">
          <i className="icon play" />
          <i className="icon play" />
        </div>
      </div>
    )
  }
}