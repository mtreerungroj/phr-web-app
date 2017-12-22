import React, { Component } from 'react'
import { Card, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Step1Staff extends Component {
  render () {
    return (
      <div style={styles.main}>
        <Card style={styles.card}>
          <div style={styles.header}>
            ลงทะเบียนสำหรับแพทย์และพยาบาล
          </div>
          <form onSubmit={this.props._handleCreateUser}>
            <div style={styles.form}>
              <div style={styles.input}>
                <TextField
                  name='email'
                  type='email'
                  errorText={this.props.emailErrorText}
                  floatingLabelText='กรอกอีเมลของคุณ'
                  onChange={this.props._handleChangeValue}
                  fullWidth
                />
              </div>
              <div style={styles.input}>
                <TextField
                  name='password'
                  type='password'
                  errorText={this.props.passwordErrorText}
                  floatingLabelText='กรอกรหัสผ่าน'
                  onChange={this.props._handleChangeValue}
                  fullWidth
                />
              </div>
              <div style={styles.input}>
                <TextField
                  name='confirmPassword'
                  type='password'
                  errorText={this.props.confirmPasswordErrorText}
                  floatingLabelText='ยืนยันรหัสผ่าน'
                  onChange={this.props._handleChangeValue}
                  fullWidth
                />
              </div>
            </div>
            <CardActions>
              <div style={styles.button}>
                <RaisedButton type='submit' label='ลงทะเบียน' primary fullWidth />
              </div>
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }
}

const styles = {
  main: {
    display: 'flex',
    minHeight: '100vh'
  },
  card: {
    minWidth: 300,
    margin: 'auto'
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
  header: {
    textAlign: 'center',
    padding: '0.5em 1em 1em 1em'
  }
}
