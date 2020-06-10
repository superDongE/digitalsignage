import React, { Component } from 'react'
import { Form, Input } from '../../../components/Form'

class WebOptions extends Component {
  constructor(props) {
    super(props)
    const { title, color, url } = props.data || {}
    this.state = {
      title,
      color,
      url
    }
  }
  handleChange = (name, value) => {
    const { onChange = () => {} } = this.props
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
          <h3>위젯: Web</h3>
          <p>Web 위젯 설정</p>
          <Input
            inline={false}
            label={'웹페이지 주소'}
            type={'text'}
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
            placeholder={'제목을 입력하세요'}
            type={'text'}
            name={'title'}
            defaultvalue={title}
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

export default WebOptions
