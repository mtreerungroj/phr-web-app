import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { pink500 } from 'material-ui/styles/colors'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailErrorText: '',
      passwordErrorText: ''
    }
  }

  validateForm = () => {
    if (this.state.email.length > 0) {
      if (this.state.password.length > 0) return 1
      else this.setState({ passwordErrorText: 'กรุณาใส่รหัสผ่าน' })
    } else {
      this.setState({ emailErrorText: 'กรุณาใส่ชื่อผู้ใช้งาน' })
    }
    return 0
  }

  _handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  _handleSubmit = e => {
    e.preventDefault()
    this.validateForm() && this.props.handleLoginSubmit(this.state.email, this.state.password)
  }

  handleForgetPasswordClick = e => {
    e.preventDefault()
    console.log('Forget password clicked!')
  }

  handleRegisterClick = e => {
    e.preventDefault()
    console.log('Registration clicked!')
  }

  render () {
    return (
      <div style={styles.main}>
        <Card style={styles.card}>
          <div style={styles.avatar}>
            <Avatar backgroundColor={pink500} icon={<LockIcon />} size={60} />
          </div>
          <form onSubmit={this._handleSubmit}>
            <div style={styles.form}>
              <div style={styles.input}>
                <TextField
                  name='email'
                  type='email'
                  errorText={this.state.emailErrorText}
                  floatingLabelText='ชื่อผู้ใช้งาน'
                  onChange={this._handleChange}
                  fullWidth
                />
              </div>
              <div style={styles.input}>
                <TextField
                  name='password'
                  type='password'
                  errorText={this.state.passwordErrorText}
                  floatingLabelText='รหัสผ่าน'
                  onChange={this._handleChange}
                  fullWidth
                />
              </div>
            </div>
            <CardActions>
              <div style={styles.button}>
                <RaisedButton type='submit' label='เข้าสู่ระบบ' primary fullWidth />
              </div>
              <div style={styles.button}>
                <RaisedButton label='ลงทะเบียน' onClick={this.handleRegisterClick} primary fullWidth />
              </div>
              <div style={styles.forgetPassword}>
                <a href='' onClick={this.handleForgetPasswordClick}>ลืมรหัสผ่าน?</a>
              </div>
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }
}

Login.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired
}

const styles = {
  main: {
    display: 'flex',
    minHeight: '80vh'
  },
  card: {
    minWidth: 300,
    margin: 'auto'
  },
  avatar: {
    margin: '1em',
    textAlign: 'center'
  },
  form: {
    padding: '0 1em 1em 1em'
  },
  input: {
    display: 'flex'
  },
  button: {
    padding: '0 0 0.5em 0.5em'
  },
  forgetPassword: {
    textAlign: 'right',
    fontSize: 12,
    fontStyle: 'italic'
  }
}
