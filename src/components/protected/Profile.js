import React, { Component } from 'react'
import { getUserStatus } from '../../services/helpers'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { grey500 } from 'material-ui/styles/colors'

export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authed: false,
      isLoading: true,
      userid: '',
      profile: {}
    }
  }

  componentDidMount () {
    const that = this
    getUserStatus().then(res => that.setState(res)).catch(res => that.setState(res))
  }

  renderStaffProfile = () => <div>Staff profile</div>

  renderPatientProfile2 = () => {
    const profile = this.state.profile
    return (
      <div style={styles.container}>
        <div style={styles.header}>ข้อมูลประวัติส่วนตัว</div>
        <TextField name='email' type='email' floatingLabelText='อีเมลที่ใช้ลงทะเบียน' value={this.state.profile.email} disabled />
        <div>เลขบัตรประชาชน: {profile.id_card}</div>
        <div>ชื่อผู้ป่วย: {profile.firstname} {profile.lastname}</div>
        <div>เพศ: {profile.gender}</div>
        <div>วันเกิด: {profile.birthdate}</div>
        <div>เชื้อชาติ: {profile.race}</div>
        <div>ศาสนา: {profile.region}</div>
        <div>สถานภาพ: {profile.status}</div>
        <div>อาชีพ: {profile.career}</div>

        <br /> <div style={styles.header}>ข้อมูลการติดต่อ</div>
        <div>เบอร์โทรศัพท์ผู้ป่วย: {profile.phone}</div>
        <div>ญาติผู้ป่วย: {profile.cousin_name}</div>
        <div>เบอร์ติดต่อญาติผู้ป่วย: {profile.cousin_phone}</div>

      </div>
    )
  }

  renderPatientProfile = () => {
    const profile = this.state.profile
    return (
      <div style={styles.container}>
        <div style={styles.header}>ข้อมูลประวัติส่วนตัว</div>
        <form onSubmit={this._handleOpenDialog}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='email'
              floatingLabelText='อีเมลที่ใช้ลงทะเบียน'
              value={profile.email}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              disabled
            />
            <TextField
              name='id_card'
              floatingLabelText='รหัสบัตรประชาชน'
              style={{ marginLeft: 20 }}
              value={profile.id_card}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              disabled
            />
          </div>
          <div style={styles.button}>
            <RaisedButton label='บันทึก' onClick={() => this.props._handleChangeLevel(0)} primary style={{ width: 120 }} />
          </div>
        </form>
        <br /> <div style={styles.header}>ข้อมูลการติดต่อ</div>
        <div>เบอร์โทรศัพท์ผู้ป่วย: {profile.phone}</div>
        <div>ญาติผู้ป่วย: {profile.cousin_name}</div>
        <div>เบอร์ติดต่อญาติผู้ป่วย: {profile.cousin_phone}</div>

      </div>
    )
  }

  render () {
    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div>
        {this.state.profile.role === 'doctor' || this.state.profile.role === 'nurse' ? this.renderStaffProfile() : this.renderPatientProfile()}
      </div>
  }
}

const styles = {
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '50%',
    margin: 'auto'
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  underlineStyle: {
    borderColor: grey500
  }
}
