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

  getState: Function
}

type EventVideo = React.SyntheticEvent<HTMLVideoElement>

export default class Video extends React.Component<VideoProps> {
  static defaultProps = {
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    preload: 'metadata',
  }

  componentDidMount() {
    // this.props.ref(this)
    // console.log(this.props.ref)
  }

  private events = {
    playing: (e: EventVideo) => {
      console.log({...e})
    },
    timeUpdate: (e: EventVideo) => {
      const video: any = e.target
      const {currentSrc, duration, currentTime, seekingTime, seeking, paused, autoPaused, ended, playbackRate, muted, volume, readyState,
         networkState, videoWidth, videoHeight, hasStarted, isFullscreen, src, preload, waiting} = video
      this.props.getState({
        currentSrc,
        duration,
        currentTime,
        seekingTime,
        seeking,
        paused,
        autoPaused,
        ended,
        playbackRate,
        muted,
        volume,
        readyState,
        networkState,
        videoWidth, videoHeight,
        hasStarted,
        isFullscreen,
        src,
        preload,
        waiting,
      })
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
        {/* <div className="controls">
          <i className="icon play" />
          <i className="icon play" />
        </div> */}
      </div>
    )
  }
}