import React, { Component } from 'react'
import { getUserStatus } from '../../services/helpers'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import { grey500 } from 'material-ui/styles/colors'

const gender = [{ id: 'men', name: 'ชาย' }, { id: 'women', name: 'หญิง' }]
const status = [
  { id: 'single', name: 'โสด' },
  { id: 'engaged', name: 'หมั้น' },
  { id: 'married', name: 'แต่งงานแล้ว' },
  { id: 'separated', name: 'แยกกันอยู่' },
  { id: 'divorced', name: 'หย่า' },
  { id: 'widowed', name: 'หม้าย' }
]
const race = [{ id: 'Thai', name: 'ไทย' }, { id: 'others', name: 'อื่นๆ' }]
const region = [{ id: 'Buddhism', name: 'พุทธ' }, { id: 'Christianity', name: 'คริสต์' }, { id: 'Islamism', name: 'อิสลาม' }, { id: 'others', name: 'อื่นๆ' }]

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

  menuItems (items) {
    return items.map(item => <MenuItem key={item.id} value={item.id} label={item.name} primaryText={item.name} />)
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
              fullWidth
              disabled
              style={{ marginRight: 10 }}
            />
            <TextField
              name='id_card'
              floatingLabelText='รหัสบัตรประชาชน'
              value={profile.id_card}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginLeft: 10 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={profile.gender}
              floatingLabelText='เพศ'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'gender')}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 220, marginRight: 20 }}
            >
              {this.menuItems(gender)}
            </SelectField>
            <TextField
              name='firstname'
              type='text'
              floatingLabelText='ชื่อ'
              defaultValue={profile.firstname}
              errorText={this.props.firstnameErrorText}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 20 }}
            />

            <TextField
              name='lastname'
              type='text'
              floatingLabelText='นามสกุล'
              defaultValue={profile.lastname}
              errorText={this.props.lastnameErrorText}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={profile.status}
              floatingLabelText='สถานะ'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'status')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 10 }}
            >
              {this.menuItems(status)}
            </SelectField>

            <SelectField
              value={profile.race}
              floatingLabelText='เชื้อชาติ'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'race')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              {this.menuItems(race)}
            </SelectField>

            <SelectField
              value={profile.region}
              floatingLabelText='ศาสนา'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'region')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginLeft: 10 }}
            >
              {this.menuItems(region)}
            </SelectField>
          </div>
          <DatePicker
            floatingLabelText='วันเกิด'
            container='inline'
            mode='landscape'
            // defaultDate={profile.birthdate_datepicker}
            maxDate={new Date()}
            autoOk
            openToYearSelection
            onChange={(foo, date) => this._handleDatePickerChangeValue(date, 'birthdate')}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 200, marginRight: 20 }}
          />
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
