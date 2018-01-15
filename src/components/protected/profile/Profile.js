import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { grey300 } from 'material-ui/styles/colors'

import { getUserStatus } from '../../../services/helpers'
import { updateProfile } from '../../../services/helpers'
import PatientProfile from './Profile.patient'
import StaffProfile from './Profile.staff'

import { gender, _status, race, region } from '../../../services/enum'

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

  updateUserStatus = () => {
    getUserStatus()
      .then(async res => {
        await this.setState({ ...res.profile })
        await this.setState(res)
      })
      .catch(res => this.setState(res))

    !Object.keys(this.state.profile).length && this.initiateProfile()
  }

  initiateProfile = () => this.setState({ gender: gender[0].id, status: _status[0].id, race: race[0].id, region: region[0].id })

  menuItems = items => items.map(item => <MenuItem key={item.id} value={item.id} label={item.name} primaryText={item.name} />)

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
    if (this.state.role === 'patient') {
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
          this.state.region) !== '' &&
        this.state.phone.length === 10 &&
        this.state.cousin_phone.length === 10
      ) {
        return 1
      }
    } else if (this.state.role === 'doctor' || this.state.role === 'nurse') {
      if (
        (this.state.hospitalid && this.state.personalid && this.state.firstname && this.state.lastname && this.state.phone) !== '' &&
        this.state.phone.length === 10 &&
        this.state.personalid.length > 3
      ) {
        return 1
      }
    }
    this.setState({ isValidateDialogOpen: true })
    return 0
  }

  _handleOpenConfirmDialog = e => this.validateForm() && this.setState({ isConfirmDialogOpen: true })

  _handleCloseConfirmDialog = e => this.setState({ isConfirmDialogOpen: false })

  _handleCloseConfirmDialogWithSubmit = e => {
    this._updateProfile()
    this.setState({ isConfirmDialogOpen: false })
  }

  _handleCloseValidateDialog = e => this.setState({ isValidateDialogOpen: false })

  _updateProfile = async () => {
    let profile = {}
    if (this.state.role === 'doctor' || this.state.role === 'nurse') {
      let { pin_code, firstname, lastname, personalid, hospitalid, phone } = await this.state
      profile = await { pin_code, firstname, lastname, personalid, hospitalid, phone }
    } else if (this.state.role === 'patient') {
      let { patient_code, gender, firstname, lastname, birthdate, status, race, region, address, career, phone, cousin_name, cousin_phone } = await this.state
      profile = await { patient_code, gender, firstname, lastname, birthdate, status, race, region, address, career, phone, cousin_name, cousin_phone }
    }

    updateProfile(this.state.userid, profile)
      .then(async res => {
        await this.setState(res)
        if (this.state.isComplete) window.location.href = '/'
      })
      .catch(res => this.setState(res))
  }

  renderStaffProfile = () => (
    <StaffProfile
      {...this.state}
      menuItems={this.menuItems}
      _handleChangeValue={this._handleChangeValue}
      _handleDatePickerChangeValue={this._handleDatePickerChangeValue}
      _handleSelectFieldChangeValue={this._handleSelectFieldChangeValue}
      _handleOpenConfirmDialog={this._handleOpenConfirmDialog}
      updateUserStatus={this.updateUserStatus}
    />
  )

  renderPatientProfile = () => (
    <PatientProfile
      {...this.state}
      menuItems={this.menuItems}
      _handleChangeValue={this._handleChangeValue}
      _handleDatePickerChangeValue={this._handleDatePickerChangeValue}
      _handleSelectFieldChangeValue={this._handleSelectFieldChangeValue}
      _handleOpenConfirmDialog={this._handleOpenConfirmDialog}
      updateUserStatus={this.updateUserStatus}
    />
  )

  render () {
    const confirmActions = [
      <FlatButton label='ยกเลิก' primary onClick={this._handleCloseConfirmDialog} />,
      <FlatButton label='ยืนยัน' primary keyboardFocused onClick={this._handleCloseConfirmDialogWithSubmit} />
    ]
    const validateActions = [<FlatButton label='ตกลง' primary onClick={this._handleCloseValidateDialog} />]

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
