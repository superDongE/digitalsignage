import React from 'react'
import _ from 'lodash'

import Dialog from '../Dialog'
import { Form, Input, Button, ButtonGroup } from '../Form'

import { getSlide, addSlide, updateSlide } from '../../actions/slide'

class SlideEditDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      upload: props.upload,
      ...(props.upload ? {} : {})
    }
  }

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    if (this.props.upload != prevProps.upload) {
      this.setState({
        upload: this.props.upload,
        ...(this.props.upload ? {} : {})
      })
    }
  }

  refresh = () => {
    const { slide, upload } = this.props
    if (slide) {
      return getSlide(slide).then(data => {
        this.setState({
          data: undefined,
          title: undefined,
          description: undefined,
          type: undefined,
          duration: undefined,
          ...data,
          upload,
          ...(upload ? {} : {})
        })
      })
    } else {
      this.setState({
        data: undefined,
        title: undefined,
        description: undefined,
        type: undefined,
        duration: undefined,
        upload,
        ...(upload ? {} : {})
      })
      return Promise.resolve()
    }
  }


  open = () => {
    this.refresh()
    this.dialog && this.dialog.open()
  }

  close = () => {
    const { refresh } = this.props
    this.dialog && this.dialog.close()
    if (refresh) return refresh()
    return Promise.resolve()
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
      // Clean up data if the type of slide changed
      ...(name == 'type' ? { data: '' } : {})
    })
  }

  save = () => {
    const { slide, slideshow } = this.props
    const { upload, ...otherProps } = this.state
    if (slideshow) {
      return addSlide(slideshow, upload, _.pickBy(otherProps, v => v !== undefined)).then(() => {
        this.close()
      })
    } else {
      return updateSlide(slide, upload, _.pickBy(otherProps, v => v !== undefined)).then(() => {
        this.close()
      })
    }
  }

  render() {
    const { data, title, description, duration,type='',upload } = this.state

    return (
      <Dialog ref={ref => (this.dialog = ref)}>
        <Form>
          <Input
            type={'select'}
            name={'type'}
            label={'슬라이드타입'}
            value={type}
            choices={[
              { id: 'youtube', label: 'Youtube Video' },
              { id: 'web', label: 'Web Page' },
              { id: 'photo', label: 'Photo' },
              { id: 'video', label: 'video'}
            ]}
            onChange={this.handleChange}
          />
          {type == 'photo' || upload ? (
            <Input
              type={'photo'}
              label={'업로드'}
              name={'upload'}
              value={upload ? upload.preview : data}
              onChange={this.handleChange}
              inline={true}
            />
          ) : type == 'video' || upload ? (
            <Input
              type={'video'}
              label={'업로드'}
              name={'upload'}
              value={upload ? upload.preview : data}
              onChange={this.handleChange}
              inline={true}
            />
          ) : (
            <Input
              type={'text'}
              label={type == 'web' ? 'Web URL' : type == 'youtube' ? 'Youtube URL' : ' '}
              name={'data'}
              value={data}
              onChange={this.handleChange}
            />
          )
        }
          <Input
            type={'number'}
            label={'지속시간'}
            name={'duration'}
            value={duration}
            placeholder={'5'}
            onChange={this.handleChange}
          />
          <Input
            type={'text'}
            label={'제목'}
            name={'title'}
            value={title}
            placeholder={'제목을 입력하세요'}
            onChange={this.handleChange}
          />
          <Input
            type={'textarea'}
            label={'내용'}
            name={'description'}
            value={description}
            placeholder={'내용을 입력하세요'}
            onChange={this.handleChange}
          />
        </Form>
        <ButtonGroup>
          <Button text={'Save'} color={'#334467'} onClick={this.save} />
          <Button text={'Cancel'} color={'#e85454'} onClick={this.close} />
        </ButtonGroup>
      </Dialog>
    )
  }
}

export default SlideEditDialog
