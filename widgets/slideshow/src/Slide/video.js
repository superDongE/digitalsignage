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

      playVideo = () => {
        // You can use the play method as normal on your video ref
        this.refs.video.play();
      };

      loadVideo = () => {
        // Pause as well
        this.refs.video.load();
      };


  /**
   * Renders the inner content of the slide (ex. the photo, youtube iframe,video, etc)
   * @param {string} data The slide's data (usually a URL or object ID)
   * @returns {Component}
   */
  renderSlideContent(data) {
    return (
      <div className='video-content'>
            <video
            width='100%'
            height='auto'
              ref="video"
              src={data}
            />
          </div>
    )
  }

  /**
   * Stops the slide's content from playing when the slide is out of focus
   */
  stop = () => {
    if(this.video){
      this.loadVideo();
    }
  }

  /**
   * Starts or resumes the slide's content when the slide is in focus
   */
   play = () => {
     if (this.video ) {
         this.playVideo()
       }
   }
}

export default VideoSlide
