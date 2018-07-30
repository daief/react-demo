import * as React from 'react';
import {Player, BigPlayButton} from 'video-react';
import {ticker} from './Timer'
import Video from './Video'

export default class Page extends React.Component {
  player: any

  state = {
    playState: {},
    time: 0,
  }

  componentDidMount() {
    this.player &&
      this.player.subscribeToStateChange((state: any) => {
        const {waiting, seeking, paused, isActive} = state
        if (waiting || seeking || paused) {
          ticker.stop()
        } else {
          this.setState({ time: ticker.tick() / 1000 })
        }

        this.setState({
          playState: state,
        })
      })

    window.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.player && this.player.pause()
      }
    })
  }

  render() {
    return (
      <div>
        <Player
          playsInline
          autoHide={false}
          preload="metadata"
          poster="https://oss-tonghang.huizhifintech.com/hth/video_image/201807101.jpg"
          src="http://113.215.26.195/mp4files/523100000066F578/tonghang.video.huizhifintech.com/Act-ss-mp4-ld/3J2wAZwNAgjEfsjycA67iXVWM2t8CNjk/1duotiaotuihuoke.mp4"
          ref={(el: any) => (this.player = el)}
        >
          <BigPlayButton position="center" />
        </Player>
        <div>
          time: {this.state.time} s
        </div>

        <Video
          src="http://113.215.26.195/mp4files/523100000066F578/tonghang.video.huizhifintech.com/Act-ss-mp4-ld/3J2wAZwNAgjEfsjycA67iXVWM2t8CNjk/1duotiaotuihuoke.mp4"
          preload="metadata"
        />
      </div>
    )
  }
}