/**
 * @fileoverview Slide component that given a slide type and its data renders it
 * along with its title and description.
 */

import GenericSlide from './Generic'

class VideoSlide extends GenericSlide {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.state.loading.resolve()
  }

  /**
   * Renders the inner content of the slide (ex. the photo, youtube iframe,video, etc)
   * @param {string} data The slide's data (usually a URL or object ID)
   * @returns {Component}
   */
  renderSlideContent(data) {
    return (
      <video
        width='100%'
        height='100%'
        src={data}
        frameborder='0'
        allowfullscreen
        controls loop
      />
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
