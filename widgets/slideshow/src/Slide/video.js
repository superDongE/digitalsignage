/**
 * @fileoverview Slide component that given a slide type and its data renders it
 * along with its title and description.
 */

import GenericSlide from './Generic'
import React from 'react'

class VideoSlide extends GenericSlide {
  constructor(props) {
    super(props)

    this.video = React.createRef()
  }

  componentDidMount() {
    if (this.video && this.video.current && this.video.current.complete) {
      this.handleImageLoaded()
    }
  }

  handlevideoErrored = () => {
    this.state.loading.reject
      ? this.state.loading.reject()
      : this.setState({ loading: { promise: Promise.reject() } })
  }

  handlevideoErrored = () => {
    this.state.loading.reject
      ? this.state.loading.reject()
      : this.setState({ loading: { promise: Promise.reject() } })
  }
  /**
   * Renders the inner content of the slide (ex. the photo, youtube iframe, etc)
   * @param {string} data The slide's data (usually a URL or object ID)
   * @returns {Component}
   */
  renderSlideContent(data) {
    return (
      <div className={'youtube-container'}>
        <Video
        src={data}
        className='invisible'
        onLoad={this.handlevideoLoaded.bind(this)}
        onError={this.handlevideoErrored.bind(this)}
          opts={{
            /* eslint-disable camelcase */
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 0,
              controls: 0,
              start: 0,
              cc_load_policy: 0,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              rel: 0,
              showinfo: 0
            }
            /* eslint-enable camelcase */
          }}
        />
        <style jsx>
          {`
            .slide-content {
              width: 100%;
              height: 100%;
              background-color: #212121;
              position: relative;
            }
            .invisible {
              width: 1px;
              height: 1px;
              display: none;
              visibility: hidden;
            }
            .video-container {
              width: 100%;
              height: 100%;
              min-height: 100%;
            }
          `}
        </style>
      </div>
    )
  }

  /**
   * Stops the slide's content from playing when the slide is out of focus
   */
   stop = () => {
     if (this.video) this.video.pauseVideo() && this.video.seekTo(0)
   }

  /**
   * Starts or resumes the slide's content when the slide is in focus
   */
   play = () => {
     if (this.video) this.video.playVideo()
   }
}

export default VideoSlide
