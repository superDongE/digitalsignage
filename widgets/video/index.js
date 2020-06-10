import BaseWidget from '../base_widget'
import VideoContent from './src/VideoContent'
import VideoOptions from './src/VideoOptions'

export default class Video extends BaseWidget {
  constructor() {
    super({
      name: 'video',
      version: '0.1',
      icon: 'video',
      defaultData: {
        title: null,
        url: null,
      }
    })
  }

  get Widget() {
    return VideoContent
  }

  get Options() {
    return VideoOptions
  }
}
