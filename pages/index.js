

import Frame from '../components/Admin/Frame.js'
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import DropdownButton from '../components/DropdownButton'

import { getDisplays } from '../actions/display'


class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displays: props.displays || []
    }
  }

  static async getInitialProps({ req }) {
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
    const displayList = await getDisplays(host)
    return { displays: displayList, host: host }
  }

  navigateToDisplay = id => {
    Router.push('/display/' + id)
  }

  render() {
    const { displays = [] } = this.state
    return (
      <div className='home'>
        <img src ="./uploads/bb.png" alt="logo"width="1000" height="200"/>
        <img src ="./uploads/logo.png" alt="logo"width="700" height="auto"/>
        <div className='btn-group'>
          <Link href='/layout' style={{ margin: 20 }}>
            <div className='btn admin'>Admin Home</div>
          </Link>
          <div style={{ margin: 20 }}>
            <DropdownButton
              icon='chevron-down'
              text='Display Home'
              style={styles.btn}
              onSelect={this.navigateToDisplay}
              choices={displays.map(display => ({
                key: display._id,
                name: display.name
              }))}
            />
          </div>
        </div>
        <style jsx>
          {`
            .home {
              background:#334467 ;
              background-size:cover;
              font-family: 'Open Sans', sans-serif;
              padding: 40px;
              min-height: 100%;
              min-width: auto;
              width:100%;
              height: auto;
              position: fixed;
              top: 0;
              left: 0;
              margin: auto;
              text-align: center;
            }
            .home p {
            }
            .btn-group {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width="50%";
              height="auto";
            }
            .btn {
              background: lightgray;
              padding: 20px;
              text-decoration: none;
              text-transform: uppercase;
              color: white;
              //border-radius: 4px;
              margin: 20px;
              font-size: 16;
            }
            .btn.admin {
              background: #334467;
            }
            .btn.home {
              background: #334467;
            }
            .btn:hover {
              background: #3E5A99;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    )
  }

}

const styles = {
  btn: {
    padding: 20,
    textDecoration: 'none',
    textTransform: 'uppercase',
    //borderRadius: 4,
    fontSize: 16
  },
  btnAdmin: {
    background: '#334467'
  }
}

export default Index
