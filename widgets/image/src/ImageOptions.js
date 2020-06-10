import React, { Component } from 'react'
import { Form, Input, InlineInputGroup } from '../../../components/Form'
import { standaloneUpload } from '../../../actions/slide'
class ImageOptions extends Component {
  constructor(props) {
    super(props)
    const { title, color, fit, url } = props.data || {}
    this.state = {
      title,
      color,
      fit,
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
    const { title, color, fit, url } = this.state
    return (
      <div className={'container'}>
        <Form>
          <h3>위젯: 이미지</h3>
          <p>이미지 위젯 설정</p>
          <InlineInputGroup>
            <Input
              inline={false}
              label={'배경색'}
              type={'color'}
              name={'color'}
              value={color}
              onChange={this.handleChange}
              expand={false}
            />
            <Input
              inline={false}
              label={'제목'}
              type={'text'}
              name={'title'}
              placeholder={'제목을 입력하세요'}
              value={title}
              onChange={this.handleChange}
              expand={true}
            />
          </InlineInputGroup>
          <InlineInputGroup>
            <Input
              inline={false}
              label={'이미지'}
              type={'photo'}
              name={'url'}
              value={url}
              onChange={this.handleChange}
            />
            <Input
              inline={false}
              label={'사진 편집'}
              type={'select'}
              name={'fit'}
              value={fit}
              choices={[
                { label: 'Zoom-in (Cover)', id: 'cover' },
                { label: 'Fit to Container', id: 'contain' }
              ]}
              onChange={this.handleChange}
              expand={false}
            />
          </InlineInputGroup>
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

export default ImageOptions
