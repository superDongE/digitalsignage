

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

          <div className='total'>
          <div className='main'>
            <img src ="./uploads/logo5.jpg" alt="logo"
               width ="200" height="auto" style={{ margin: 50 }} />

            <div className='btn-group'>
              <Link href='/layout' style={{ margin: 10 }}>
                <div className='btn'>admin</div>
              </Link>
          <div style={{ margin: 10 }}>
            <DropdownButton
              icon='chevron-down'
              text='display'

              style={styles.btn}
              onSelect={this.navigateToDisplay}
              choices={displays.map(display => ({  key: display._id,
                                                   name: display.name  }))} />
          </div>
          </div>
          </div>
          </div>



        <style jsx>
          {`
            .main {
              background-color: #F4F4F6;

              width: 500px;
              height: 500px;
              margin: 7em auto;
              border-radius: 7em;
              box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.6);


            }
            .home {
              background-image: url('./uploads/d3.jpg') ;
              background-size: 100% 100%;
              background-repeat:no-repeat
              font-family: 'Open Sans', sans-serif;
              min-height: 100%;
              min-width: 100%;
              width: 100%;
              height: 100%;
              position: fixed;
              top: 0%;
              left: 0%;
              text-align: center;

              }
            }

            .btn-group {
              display: Block;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              width= 50%;
              height="auto";
            }
            .btn {
              background: #262930;
              margin: 5px 165px 10px 165px;
              border-radius: 30px;
              box-shadow: 4px 4px 12px 4px rgba(0, 0, 0, 0.2);

              color: #f7f7f7;
              font-size: 15;
              text-transform: uppercase;
              transition-duration: 0.6s;

              padding: 16px;
              padding-left: 24px;
              padding-right: 24px;
            }
            .total {
              position: absolute;
              top: 50%;
              left: 50%;
              transform:translate(-50%,-50%);

            }
            .btn1 {
              background: #334467;
              border-radius: 10px;
            }
            .btn.home {
              background: #262930;
            }
            .btn:hover {
              background: #0d3793;
              color : #fffff;
              cursor: pointer;
            }
            .bl {
                  content: '';
                  filter: blur(20px);
                  height: 100%;
                  left: 0;
                  position: absolute;
                  top: 0;
                  width: 100%;
                  z-index: -1;
            }

          `}
        </style>
    </div>
    )
  }

}

const styles = {
  btn: {

    textDecoration: 'none',
    textTransform: 'uppercase',
    borderRadius: 30,
    fontSize: 15,

  },
  btnAdmin: {
    background: '#334467',
  }
}

export default Index
