import React, { Component } from 'react'
import Page404 from '../Page404'
import Step0Register from './Step0.register'
import Step1Staff from './Step1.staff'
import Step1Patient from './Step1.patient'
import { createUser } from '../../services/helpers'

export default class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthed: false,
      level: 0,
      isStaff: false,
      email: '',
      password: '',
      confirmPassword: '',
      emailErrorText: ''
    }
  }

  handleChangeLevel = (level, isStaff = false) => {
    this.setState({ level, isStaff })
  }

  _handleChangeValue = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm = () => {
    if (this.state.email.length > 0) {
      // add condition here
      if (this.state.password.length > 0) return 1
      else this.setState({ passwordErrorText: 'กรุณากรอกรหัสผ่าน' })
    } else {
      this.setState({ emailErrorText: 'กรุณากรอกอีเมล' })
    }
    return 0
  }

  _handleCreateUser = e => {
    e.preventDefault()
    this.validateForm() && console.log('create user')
    // createUser(this.state.email, this.state.password)
  }

  renderElement = () => {
    if (this.state.level === 0) return <Step0Register handleChangeLevel={this.handleChangeLevel} />
    else if (this.state.isStaff) return <Step1Staff {...this.state} _handleChangeValue={this._handleChangeValue} _handleCreateUser={this._handleCreateUser} />
    else {
      switch (this.state.level) {
        case 1:
          return <Step1Patient />
        default:
          return <Page404 />
      }
    }
  }

  render () {
    console.log(this.state)
    return (
      <div style={styles.container}>
        <div />
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
