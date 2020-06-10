import React, { Component } from 'react'
import { Form, Input, InlineInputGroup } from '../../../components/Form'
import { standaloneUpload } from '../../../actions/slide'
class VideoOptions extends Component {
  constructor(props) {
    super(props)
    const { title, color, url } = props.data || {}
    this.state = {
      title,
      color,
      url
    }
  }

    handleChange = async (name, value) => {
      const { onChange = () => {} } = this.props
      if (name == 'upload') {
        name = 'url'
        const resp = await standaloneUpload(value)
        value = resp.data.url
      }
      this.setState(
        {
          [name]: value
        },
        () => {
          onChange(this.state)
        }
      )
    }

  render() {
    const { title, color, url } = this.state
    return (
      <div className={'container'}>
        <Form>
          <h3>위젯: Video</h3>
          <p>Video 위젯 설정</p>
          <Input
            inline={false}
            label={'비디오'}
            type={'video'}
            name={'url'}
            value={url}
            onChange={this.handleChange}
          />
          <Input
            inline={false}
            label={'배경색'}
            type={'color'}
            name={'color'}
            value={color}
            onChange={this.handleChange}
          />
          <Input
            inline={false}
            label={'위젯 제목'}
            type={'text'}
            name={'title'}
            value={title}
            placeholder={'제목을 입력하세요'}
            onChange={this.handleChange}
          />
        </Form>
        <style jsx>
          {`
            h3,
            p {
              font-family: 'Open Sans', sans-serif;
            }
            .container {
              display: flex;
              flex-direction: column;
            }
          `}
        </style>
      </div>
    )
  }
}

export default VideoOptions
