import React, { Component } from 'react'
import { getUserStatus } from '../../services/helpers'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import { grey300, grey500 } from 'material-ui/styles/colors'

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
    getUserStatus()
      .then(async res => {
        await that.setState({ ...res.profile })
        await that.setState(res)
      })
      .catch(res => that.setState(res))
  }

  menuItems (items) {
    return items.map(item => <MenuItem key={item.id} value={item.id} label={item.name} primaryText={item.name} />)
  }

  _handleSelectFieldChangeValue = (event, index, value, key) => this.setState({ [key]: value })

  _handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  renderStaffProfile = () => <div>Staff profile</div>

  renderPatientProfile = () => {
    const sDate = new Date(this.state.birthdate)

    return (
      <div style={styles.container}>
        <div style={styles.header}>ข้อมูลประวัติส่วนตัว</div>
        <form onSubmit={this._handleOpenDialog}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='email'
              floatingLabelText='อีเมลที่ใช้ลงทะเบียน'
              value={this.state.email}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginRight: 10 }}
            />
            <TextField
              name='id_card'
              floatingLabelText='รหัสบัตรประชาชน'
              value={this.state.id_card}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginLeft: 10 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={this.state.gender}
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
              value={this.state.firstname}
              errorText={this.props.firstnameErrorText}
              onChange={this._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 20 }}
            />

            <TextField
              name='lastname'
              type='text'
              floatingLabelText='นามสกุล'
              value={this.state.lastname}
              errorText={this.props.lastnameErrorText}
              onChange={this._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={this.state.status}
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
              value={this.state.race}
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
              value={this.state.region}
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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DatePicker
              floatingLabelText='วันเกิด'
              container='inline'
              mode='landscape'
              defaultDate={sDate}
              maxDate={new Date()}
              autoOk
              openToYearSelection
              onChange={(foo, date) => this._handleDatePickerChangeValue(date, 'birthdate')}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 10 }}
            />
            <TextField
              name='career'
              type='text'
              defaultValue={this.state.career}
              errorText={this.props.personalidErrorText}
              floatingLabelText='อาชีพปัจจุบัน'
              onChange={this._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200, marginLeft: 10 }}
            />
          </div>
          <br /> <div style={styles.header}>ข้อมูลการติดต่อ</div>
          <TextField
            name='address'
            type='text'
            defaultValue={this.state.address}
            errorText={this.props.personalidErrorText}
            floatingLabelText='ที่อยู่ปัจจุบัน'
            rows={2}
            rowsMax={4}
            multiLine
            fullWidth
            onChange={this._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ marginRight: 20 }}
          />
          <TextField
            name='phone'
            type='text'
            defaultValue={this.state.phone}
            errorText={this.props.personalidErrorText}
            floatingLabelText='เบอร์โทรศัพท์ผู้ป่วย'
            maxLength='10'
            onChange={this._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 200 }}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='cousin_name'
              type='text'
              defaultValue={this.state.cousin_name}
              errorText={this.props.personalidErrorText}
              floatingLabelText='ชื่อ-นามสกุล ญาติผู้ป่วย'
              onChange={this._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 350, marginRight: 20 }}
            />
            <TextField
              name='cousin_phone'
              type='text'
              defaultValue={this.state.cousin_phone}
              errorText={this.props.personalidErrorText}
              floatingLabelText='เบอร์ติดต่อญาติผู้ป่วย'
              maxLength='10'
              onChange={this._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200, marginRight: 20 }}
            />
          </div>
          <div style={styles.button}>
            <RaisedButton label='บันทึก' onClick={() => this.props._handleChangeLevel(0)} primary style={{ width: 120 }} />
          </div>
        </form>

      </div>
    )
  }

  render () {
    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={{ backgroundColor: grey300, paddingBottom: 40 }}>
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
  },
  button: {
    paddingTop: 20,
    textAlign: 'center'
  }
}
