import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

import Page404 from '../Page404'
import Step0Register from './Step0.register'
import Step1Staff from './Step1.staff'
import Step2Staff from './Step2.staff'
import Step1Patient from './Step1.patient'
import Step2Patient from './Step2.patient'
import Step3Patient from './Step3.patient'

import { createUser, updateProfile } from '../../services/helpers'

export default class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthed: false,
      level: 0,
      isStaff: false,
      isComplete: false,
      completeMessage: 'ลงทะเบียนสำเร็จ',
      isDialogOpen: false,
      dialogMessage: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailErrorText: '',
      passwordErrorText: '',
      confirmPasswordErrorText: ''
    }
  }

  _handleChangeLevel = (level, isStaff = false) => {
    this.setState({ level, isStaff })
  }

  _handleChangeValue = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  _handleChangeManualValue = (key, value) => {
    this.setState({ [key]: value })
  }

  validateRegistrationForm = () => {
    if (this.state.email.length > 0) {
      if (this.state.password.length > 0) {
        if (this.state.password.length > 7) {
          if (this.state.password === this.state.confirmPassword) {
            this.setState({ emailErrorText: '', passwordErrorText: '', confirmPasswordErrorText: '' })
            return 1
          } else {
            if (this.state.confirmPassword.length < 1) this.setState({ passwordErrorText: '', confirmPasswordErrorText: 'กรุณายืนยันรหัสผ่าน' })
            else this.setState({ passwordErrorText: '', confirmPasswordErrorText: 'รหัสผ่านไม่ตรงกัน' })
          }
        } else this.setState({ passwordErrorText: 'กรุณากรอกรหัสผ่านอย่างน้อย 8 หลัก' })
      } else this.setState({ passwordErrorText: 'กรุณากรอกรหัสผ่าน' })
    } else {
      this.setState({ emailErrorText: 'กรุณากรอกอีเมล' })
    }
    return 0
  }

  _handleCreateUser = (e, isStaff = false) => {
    e.preventDefault()
    this.validateRegistrationForm() &&
      createUser(this.state.email, this.state.password, isStaff).then(res => this.setState(res)).catch(res => this.setState(res))
  }

  updateProfile = async () => {
    let profile = {}
    if (this.state.role === 'doctor' || this.state.role === 'nurse') {
      let { role, email, firstname, lastname, personalid, hospitalid, phone } = await this.state
      profile = await { role, email, firstname, lastname, personalid, hospitalid, phone }
    } else if (this.state.role === 'patient') {
      let {
        role,
        patient_code,
        email,
        id_card,
        gender,
        firstname,
        lastname,
        birthdate,
        status,
        race,
        region,
        address,
        career,
        phone,
        cousin_name,
        cousin_phone
      } = await this.state
      profile = await {
        role,
        patient_code,
        email,
        id_card,
        gender,
        firstname,
        lastname,
        birthdate,
        status,
        race,
        region,
        address,
        career,
        phone,
        cousin_name,
        cousin_phone
      }
    }

    updateProfile(this.state.userid, profile)
      .then(async res => {
        await this.setState(res)
        if (this.state.isComplete) window.location.href = '/'
      })
      .catch(res => this.setState(res))
  }

  _handleCloseDialog = () => {
    this.setState({ isDialogOpen: false })
  }

  renderElement = () => {
    if (this.state.level === 0) return <Step0Register _handleChangeLevel={this._handleChangeLevel} />
    else if (this.state.isStaff) {
      switch (this.state.level) {
        case 1:
          return (
            <Step1Staff
              {...this.state}
              validateForm={this.validateRegistrationForm}
              _handleChangeLevel={this._handleChangeLevel}
              _handleChangeValue={this._handleChangeValue}
              _handleCreateUser={this._handleCreateUser}
            />
          )
        case 2:
          return (
            <Step2Staff
              {...this.state}
              _handleChangeValue={this._handleChangeValue}
              _handleChangeManualValue={this._handleChangeManualValue}
              updateProfile={this.updateProfile}
            />
          )
        default:
          return <Page404 />
      }
    } else {
      switch (this.state.level) {
        case 1:
          return (
            <Step1Patient
              {...this.state}
              validateForm={this.validateRegistrationForm}
              _handleChangeLevel={this._handleChangeLevel}
              _handleChangeValue={this._handleChangeValue}
              _handleCreateUser={this._handleCreateUser}
            />
          )
        case 2:
          return (
            <Step2Patient
              {...this.state}
              _handleChangeLevel={this._handleChangeLevel}
              _handleChangeValue={this._handleChangeValue}
              _handleChangeManualValue={this._handleChangeManualValue}
            />
          )
        case 3:
          return (
            <Step3Patient
              {...this.state}
              _handleChangeValue={this._handleChangeValue}
              _handleChangeManualValue={this._handleChangeManualValue}
              updateProfile={this.updateProfile}
            />
          )
        default:
          return <Page404 />
      }
    }
  }

  render () {
    const actions = [<FlatButton label='ตกลง' primary keyboardFocused onClick={this._handleCloseDialog} />]

    return (
      <div style={styles.container}>
        <Dialog title='เกิดข้อผิดพลาด' actions={actions} modal={false} open={this.state.isDialogOpen} onRequestClose={this._handleCloseDialog}>
          {this.state.dialogMessage}
        </Dialog>
        <Snackbar open={this.state.isComplete} message={this.state.completeMessage} autoHideDuration={3000} />
        {this.renderElement()}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
