/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

const DEFAULT_COLOR = '#2d3436'


class VideoContent extends Component {
  constructor(props) {
    super(props)
    this.iframe = React.createRef()
  }


  render() {
    const { data: { title, url, color = DEFAULT_COLOR } = {} } = this.props
    return (
      <div className='video'>
        {title && (
          <div className='titleConainer'>
            <div className='title'>{title}</div>
          </div>
        )}
        <div className='videoContainer'>
              <video
              src={url}
              width='100%'
              height='auto'
              autoplay='autoplay'
              loop='loop'
              />
            </div>
        <style jsx>
          {`
            .video {
              position: relative;
              box-sizing: border-box;
              height: 100%;
              width: 100%;
              background: ${color};
              flex: 1;
              font-family: 'Open Sans', sans-serif;
              display: flex;
              flex-direction: column;
            }
            .video .videoContainer {
              flex: 1;
              border: none;
              overflow: hidden;
            }
            .video .titleConainer {
              padding: 12px;
            }
            .video .title {
              font-family: 'Open Sans', sans-serif;
              border-left: 3px solid rgba(255, 255, 255, 0.5);
              font-size: 16px;
              padding-left: 12px;
              font-weight: 600;
              text-transform: uppercase;
              z-index: 1;
            }
          `}
        </style>
      </div>
    )
  }
}

export default VideoContent
