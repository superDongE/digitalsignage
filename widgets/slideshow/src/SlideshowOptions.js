import React, { Component } from 'react'
import { Form, Input } from '../../../components/Form'
import { getSlideshows } from '../../../actions/slideshow'

class SlideshowOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideshows: []
    }
  }
  handleChange = (name, value) => {
    const { onChange = () => {} } = this.props
    if (name == 'slideShowId') {
      onChange(value)
    }
  }

  componentDidMount() {
    getSlideshows().then(data => {
      const slideshows = data.map(slideshow => ({
        id: slideshow._id,
        label: slideshow.title || '제목 없음'
      }))
      this.setState({ slideshows })
    })
  }

  render() {
    const { data } = this.props
    const { slideshows } = this.state
    return (
      <Form>
        <h3>위젯: 슬라이드쇼</h3>
        <p>위젯을 표시 할 슬라이드 쇼를 선택하십시오</p>
        <Input
          inline={false}
          type={'select'}
          name={'slideShowId'}
          value={data}
          onChange={this.handleChange}
          choices={slideshows}
        />
        <style jsx>
          {`
            h3,
            p {
              font-family: 'Open Sans', sans-serif;
            }
          `}
        </style>
      </Form>
    )
  }
}

export default SlideshowOptions
