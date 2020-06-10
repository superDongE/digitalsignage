import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false
library.add(fas)
library.add(fab)

class DropdownButton extends Component {
  constructor() {
    super()

    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  showMenu(event) {
    event.preventDefault()

    this.setState({ showMenu: true }, () => {
      document && document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu(event, force = false) {
    if (force || (this.dropdownMenu && !this.dropdownMenu.contains(event.target))) {
      this.setState({ showMenu: false }, () => {
        document && document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  render() {
    const {
      icon = null,
      text = 'Show menu',
      choices = [],
      onSelect = () => {},
      style = {},
      menuStyle = {},
      children
    } = this.props
    return (
      <div className={'dropdownContainer'}>
        {children ? (
          <div style={style} onClick={this.showMenu}>
            {children}
          </div>
        ) : (
          <button className={'btnz'} onClick={this.showMenu} style={style}>
            <div className={'btnIcon'}>{icon && <FontAwesomeIcon icon={icon} />}</div>
            {text}
          </button>
        )}

        {this.state.showMenu ? (
          <div
            className='menu'
            ref={element => {
              this.dropdownMenu = element
            }}
            style={menuStyle}
          >
            {choices.map(choice => (
              <button
                className={'choice'}
                onClick={event => {
                  this.closeMenu(event, true /* force */)
                  onSelect(choice.key)
                }}
              >
                {choice.icon && (
                  <div className={'btnIcon'}>
                    <FontAwesomeIcon icon={choice.icon} prefix={'fab'} />
                  </div>
                )}
                {choice.name}
              </button>
            ))}
          </div>
        ) : null}
        <style jsx>
          {`

            .dropdownContainer {
              display: inline-block;
              vertical-align: middle;
              position: relative;
            }

            .btnz {
              font-family: 'Open Sans', sans-serif;
              background: #262930;
              box-shadow: 4px 4px 12px 4px rgba(0, 0, 0, 0.2);
                border-radius: 7em;

              padding: 16px;
              padding-left: 20px;
              padding-right: 40px;

              border: none;
              display: inline-block;
              transition-duration: 0.6s;

              text-decoration: none;
              text-transform: uppercase;
              color: white;
              font-size: 16px;
              outline: none;
              cursor: pointer;
            }
            .btnIcon {
              margin-left: 15px;
              margin-right: 20px;
              display: inline;
            }
            .btnz:hover {
              background: #0d3793;
              cursor: pointer;
            }

            .menu {
              position: absolute;
              top: calc(100% + 8px);
              left: 0;
              display: flex;
              flex-direction: column;
              z-index: 2;
              background: white;
              box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.6);
              border-radius: 50px;
              overflow: hidden;
              min-width: 100%;
            }

            .choice {
              font-family: 'Open Sans', sans-serif;
              background:  #f4f4f4
              text-decoration: none;
              text-transform: uppercase;

              color: #333;
              min-width: 150px;
              font-size: 14px;
              border: none;
              border-bottom: 1px solid #efefef;
              display: flex;

              padding: 16px;
              padding-left: 24px;
              padding-right: 24px;
              text-align: left;
              outline: none;
              cursor: pointer;
              flex-direction: row;

              transition-duration: 0.2s;
            }
            .choice:hover {
              background: #0d3793;
              color: white;
            }
            .choice:last-child {
              border-bottom: 0px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default DropdownButton
