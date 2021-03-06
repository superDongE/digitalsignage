import { Component } from 'react'
import React from 'react'
import ContentLoader from 'react-content-loader'
import dynamic from 'next/dynamic'

import SlideEditDialog from './Admin/SlideEditDialog.js'

const DropzoneWithNoSSR = dynamic(() => import('react-dropzone'), {
  ssr: false,
  loading: () => (
    <ContentLoader height={120} width={640}>
      <rect x='0' y='0' rx='5' ry='5' width='100%' height='100' />
    </ContentLoader>
  )
})

class Upload extends Component {
  constructor(props) {
    super(props)
    this.dialog = React.createRef()
    this.state = {
      lastFile: null
    }
  }

  handleOnDropAccepted = acceptedFiles => {
    this.dialog && this.dialog.current.open()
    const file = Object.assign(acceptedFiles[acceptedFiles.length - 1], {
      preview:
        URL && URL.createObjectURL
          ? URL.createObjectURL(acceptedFiles[acceptedFiles.length - 1])
          : typeof window !== 'undefined' && window.webkitURL
          ? window.webkitURL.createObjectURL(acceptedFiles[acceptedFiles.length - 1])
          : null
    })
    this.setState({ lastFile: file })
  }

  handleOnDropRejected = rejectedFiles => {
    alert('이 파일은 허용하지 않습니다.:' + rejectedFiles[rejectedFiles.length - 1].name)
  }

  render() {
    const { slideshow, refresh } = this.props
    const { lastFile } = this.state
    return (
      <div>
        <SlideEditDialog
          slideshow={slideshow}
          upload={lastFile}
          refresh={refresh}
          ref={this.dialog}
        />
        <DropzoneWithNoSSR
          accept='image/*,video/*'
          onDropAccepted={this.handleOnDropAccepted}
          onDropRejected={this.handleOnDropRejected}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div {...getRootProps()} className='upload'>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p></p>
                ) : (
                  <p>클릭하거나 동영상이나 이미지를 드래그 하세요. </p>
                )}
              </div>
            )
          }}
        </DropzoneWithNoSSR>
        <style jsx>
          {`
            .upload {
              padding: 20px;
              font-family: 'Open Sans', sans-serif;
              text-align: center;
              border-radius: 4px;
              border: 2px dashed #adadad;
              cursor: pointer;
              background: white;
              outline: none;
            }
          `}
        </style>
        </div>
    )
  }
}

export default Upload
