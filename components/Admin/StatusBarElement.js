import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd'

class StatusBarElement extends React.Component {
  constructor(props) {
    super(props)
  }

  deleteClicked = e => {
    if (e) e.stopPropagation()
    const { onDelete = () => {} } = this.props
    onDelete()
  }

  render() {
    return null
  }
}

export default StatusBarElement
