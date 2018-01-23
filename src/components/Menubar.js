import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

  handleLeftIconButtonTouchTap = () => (this.state.authed ? this.setState({ isDrawerOpen: true }) : alert('กรุณาเข้าสู่ระบบก่อน'))

  handleClose = () => this.setState({ isDrawerOpen: false })

  handleLogout = () => {
    this.props.handleLogoutSubmit()
    this.handleClose()
  }

  renderMenuForStaff = () => (
    <div>
      <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/search' />}>ค้นหาผู้ป่วย</MenuItem>
      <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/overview' />}>ภาพรวมของผู้ป่วย</MenuItem>
    </div>
  )

  renderMenuForPatient = () => (
    <div>
      <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/progress' />}>ผลการทำกิจกรรม</MenuItem>
    </div>
  )

  render () {
    return this.state.authed
      ? <div>
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
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/' />}>หน้าแรก</MenuItem>
            {this.props.role === 'doctor' || this.props.role === 'nurse' ? this.renderMenuForStaff() : this.renderMenuForPatient()}
            <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/profile' />}>ประวัติส่วนตัว</MenuItem>
            <MenuItem onTouchTap={this.handleLogout}>ออกจากระบบ</MenuItem>
          </Drawer>
        </div>
      </div>
      : <div />
  }
}
