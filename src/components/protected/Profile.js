import React, { Component } from 'react'
import { getUserStatus } from '../../services/helpers'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import Dialog from 'material-ui/Dialog'
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
      email: '',
      profile: {},
      isConfirmDialogOpen: false,
      confirmDialogMessage: 'คุณสามารถแก้ไขข้อมูลประวัติส่วนตัวได้ในภายหลัง',
      isValidateDialogOpen: false,
      ValidateDialogMessage: 'กรุณากรอกข้อมูลให้ครบก่อนจะบันทึกข้อมูล'
    }
  }

  async componentDidMount () {
    const that = this
    await getUserStatus()
      .then(async res => {
        await that.setState({ ...res.profile })
        await that.setState(res)
      })
      .catch(res => that.setState(res))

    !Object.keys(this.state.profile).length && this.initiateProfile()
  }

  initiateProfile = () => this.setState({ gender: gender[0].id, status: status[0].id, race: race[0].id, region: region[0].id })

  menuItems (items) {
    return items.map(item => <MenuItem key={item.id} value={item.id} label={item.name} primaryText={item.name} />)
  }

  _handleSelectFieldChangeValue = (event, index, value, key) => this.setState({ [key]: value })

  _handleDatePickerChangeValue = async (date, key) => {
    // await date.setDate(date.getDate() + 1)
    const full_date = date
    const full_key = `${key}_full`
    date = await date.toISOString().substring(0, 10)
    this.setState({ [key]: date, [full_key]: full_date })
  }

  _handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  validateForm = () => {
    if (
      (this.state.address &&
        this.state.career &&
        this.state.cousin_name &&
        this.state.cousin_phone &&
        this.state.phone &&
        this.state.gender &&
        this.state.firstname &&
        this.state.lastname &&
        this.state.birthdate &&
        this.state.status &&
        this.state.race &&
        this.state.region) === '' ||
      this.state.phone.length < 10 ||
      this.state.cousin_phone.length < 10
    ) {
      this.setState({ isValidateDialogOpen: true })
      return 0
    }
    return 1
  }

  _handleOpenConfirmDialog = e => {
    this.validateForm() && this.setState({ isConfirmDialogOpen: true })
  }

  _handleCloseConfirmDialog = e => {
    this.setState({ isConfirmDialogOpen: false })
  }

  _handleCloseConfirmDialogWithSubmit = e => {
    // this.props.updateProfile()
    console.log('update profile')
    this.setState({ isConfirmDialogOpen: false })
  }

  _handleCloseValidateDialog = e => {
    this.setState({ isValidateDialogOpen: false })
  }

  renderStaffProfile = () => <div>Staff profile</div>

  renderPatientProfile = () => {
    let date = new Date()
    if (this.state.birthdate) date = new Date(this.state.birthdate)
    else this._handleDatePickerChangeValue(date, 'birthdate')

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
              errorText={this.state.id_card === undefined ? 'กรุณาติดต่อพยาบาลเพื่อกรอกข้อมูลนี้' : ''}
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
              errorText={this.state.firstname === undefined ? 'กรุณากรอกข้อมูล' : ''}
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
              errorText={this.state.lastname === undefined ? 'กรุณากรอกข้อมูล' : ''}
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
              defaultDate={date}
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
              errorText={this.state.career === undefined ? 'กรุณากรอกข้อมูล' : ''}
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
            errorText={this.state.address === undefined ? 'กรุณากรอกข้อมูล' : ''}
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
            errorText={this.state.phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
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
              errorText={this.state.cousin_name === undefined ? 'กรุณากรอกข้อมูล' : ''}
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
              errorText={this.state.cousin_phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='เบอร์ติดต่อญาติผู้ป่วย'
              maxLength='10'
              onChange={this._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200, marginRight: 20 }}
            />
          </div>
          <div style={styles.button}>
            <RaisedButton label='บันทึก' onClick={this._handleOpenConfirmDialog} primary style={{ width: 120 }} />
          </div>
        </form>

      </div>
    )
  }

  render () {
    const confirmActions = [
      <FlatButton label='ยกเลิก' primary onClick={this._handleCloseConfirmDialog} />,
      <FlatButton label='ยืนยัน' primary keyboardFocused onClick={this._handleCloseConfirmDialogWithSubmit} />
    ]
    const validateActions = [<FlatButton label='ตกลง' primary onClick={this._handleCloseValidateDialog} />]

    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={{ backgroundColor: grey300, paddingBottom: 40 }}>
        <Dialog
          title='ยืนยันการบันทึกข้อมูล'
          actions={confirmActions}
          modal={false}
          open={this.state.isConfirmDialogOpen}
          onRequestClose={this._handleCloseConfirmDialog}
          >
          {this.state.confirmDialogMessage}
        </Dialog>
        <Dialog
          title='เกิดข้อผิดพลาด'
          actions={validateActions}
          modal={false}
          open={this.state.isValidateDialogOpen}
          onRequestClose={this._handleCloseConfirmDialog}
          >
          {this.state.ValidateDialogMessage}
        </Dialog>
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
    paddingTop: 30,
    textAlign: 'center'
  }
}
