import React, { Component } from 'react'
import { Card, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class Step1Patient extends Component {
  state = {
    isDialogOpen: false
  }

  _handleOpenDialog = e => {
    e.preventDefault()
    this.setState({ isDialogOpen: true })
  }

  _handleCloseDialog = e => {
    this.setState({ isDialogOpen: false })
  }

  _handleCloseDialogWithSubmit = e => {
    this.props._handleCreateUser(e)
    this.setState({ isDialogOpen: false })
  }

  render () {
    const actions = [
      <FlatButton label='ยกเลิก' primary onClick={this._handleCloseDialog} />,
      <FlatButton label='ยืนยัน' primary keyboardFocused onClick={this._handleCloseDialogWithSubmit} />
    ]

    return (
      <div style={styles.main}>
        <Dialog title='ยืนยันการลงทะเบียน' actions={actions} modal={false} open={this.state.isDialogOpen} onRequestClose={this._handleCloseDialog}>
          อีเมลที่ใช้สำหรับลงทะเบียนจะไม่สามารถเปลี่ยนได้ในภายหลัง
        </Dialog>
        <Card style={styles.card}>
          <div style={styles.header}>
            ลงทะเบียนสำหรับผู้ป่วย
          </div>
          <form onSubmit={this._handleOpenDialog}>
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
                <RaisedButton label='ยกเลิก' onClick={() => this.props.handleChangeLevel(0)} primary style={{ width: 120 }} />
                <RaisedButton type='submit' label='ลงทะเบียน' primary style={{ width: 120 }} />
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
    padding: '0 0 0.5em 0.5em',
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    textAlign: 'center',
    padding: '0.5em 1em 1em 1em'
  }
}
