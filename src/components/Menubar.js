import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

export default class Menubar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDrawerOpen: false,
      authed: this.props.authed
    }
  }

  handleLeftIconButtonTouchTap = () => {
    this.state.authed ? this.setState({ isDrawerOpen: true }) : alert('กรุณาเข้าสู่ระบบก่อน')
  }

  handleClose = () => this.setState({ isDrawerOpen: false })

  render () {
    return (
      <div>
        <div>
          <div>
            <AppBar
              title='ระบบข้อมูลสุขภาพส่วนบุคคลสำหรับผู้ป่วยหลังผ่าตัดหัวใจ'
              iconClassNameRight='muidocs-icon-navigation-expand-more'
              onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
            />
          </div>
          <div>
            <Drawer docked={false} open={this.state.isDrawerOpen} onRequestChange={isDrawerOpen => this.setState({ isDrawerOpen })}>
              <AppBar showMenuIconButton={false} title='เมนู' />

              <MenuItem onClick={this.handleClose}>ลงทะเบียนผู้ป่วย</MenuItem>
              <MenuItem onClick={this.handleClose}>ออกจากระบบ</MenuItem>
            </Drawer>
          </div>
        </div>
      </div>
    )
  }
}
