import React from 'react'
import classnames from 'classnames'
import Lightbox from 'react-image-lightbox'

const images = [
  '//placekitten.com/1500/500',
  '//placekitten.com/4000/3000',
  '//placekitten.com/800/1200',
  '//placekitten.com/1500/1500',
  'http://huizhifintech.oss-cn-hangzhou.aliyuncs.com/hth/head_image/eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoie1wiYXV0aG9yaXRpZXNcIjpbe1wiYXV0aG9yaXR5XCI6XCJST0xFX1VTRVJcIn1dLFwiZGV0YWlsXCI6e1wibmlja05hbWVcIjpcIuWQg-eMq-eMq-eahOmxvFwifSxcImxvZ2luVHlwZVwiOlwiY2VsbFBob25lXCIsXCJ1c2VySWRcIjpcIjFcIn0iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNTIwMDQ3NDYzfQ.2AvGR2ZfRLRwaNMtmqewu2jM8EODVij7u_TuJT0Z_15fwJQsYh_E22AwYM6Z2A_5mm82Iy0fD_6jpIUhclzPag/1517474357183/778228ec-5c41-47b0-9b5c-c8b1938508b7.png'
]

export default class A extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
  }

  render() {
    const { photoIndex, isOpen } = this.state

    return (
      <div>
        <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
            // enableZoom={false}
            // discourageDownloads={true}
          />
        )}
      </div>
    )
  }
}