import React, { Component } from 'react'
import { Card, CardActions } from 'material-ui/Card'
import { grey200, grey600, cyan500 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

export default class Step3Patient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isConfirmDialogOpen: false,
      confirmDialogMessage: 'คุณสามารถแก้ไขข้อมูลประวัติส่วนตัวได้ในภายหลัง',
      isValidateDialogOpen: false,
      ValidateDialogMessage: 'กรุณากรอกข้อมูลให้ครบก่อนจะบันทึกข้อมูล'
    }
  }

  _handleSelectFieldChangeValue = (event, index, value, key) => this.props._handleChangeManualValue(key, value)

  _handleOpenConfirmDialog = e => {
    e.preventDefault()
    this.setState({ isConfirmDialogOpen: true })
  }

  _handleCloseConfirmDialog = e => {
    this.setState({ isConfirmDialogOpen: false })
  }

  _handleCloseValidateDialog = e => {
    this.setState({ isValidateDialogOpen: false })
  }

  validateForm = () => {
    if (
      (this.props.address && this.props.career && this.props.phone && this.props.cousin_name && this.props.cousin_phone) === undefined ||
      this.props.phone.length < 10 ||
      this.props.cousin_phone.length < 10
    ) {
      this.setState({ isValidateDialogOpen: true })
      return 0
    }
    return 1
  }

  _handleCloseConfirmDialogWithSubmit = e => {
    this.validateForm() && this.props.updateProfile()
    this.setState({ isConfirmDialogOpen: false })
  }

  render () {
    const confirmActions = [
      <FlatButton label='ยกเลิก' primary onClick={this._handleCloseConfirmDialog} />,
      <FlatButton label='ยืนยัน' primary keyboardFocused onClick={this._handleCloseConfirmDialogWithSubmit} />
    ]
    const validateActions = [<FlatButton label='ตกลง' primary onClick={this._handleCloseValidateDialog} />]

    return (
      <Card style={styles.container}>
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
        <div style={styles.topContent}>
          อีเมล: <span style={styles.boldText}>{this.props.email}</span>
          <br />
          รหัสผู้ป่วยภายในระบบ: <span style={styles.boldText}>{this.props.patient_code} {'   '}</span>
          <span style={styles.notation}>
            (หมายเหตุ: รหัสผู้ป่วยภายในระบบนี้เป็นรหัสเฉพาะบุคคล)
          </span>
        </div>

        <div style={styles.header}>
          กรอกข้อมูลประวัติส่วนตัวอื่นๆ
        </div>

        <form style={{ width: '80%', margin: 'auto' }} onSubmit={this._handleOpenConfirmDialog}>
          <TextField
            name='address'
            type='text'
            errorText={this.props.personalidErrorText}
            floatingLabelText='ที่อยู่ปัจจุบัน'
            rows={2}
            rowsMax={4}
            multiLine
            fullWidth
            onChange={this.props._handleChangeValue}
            style={{ marginRight: 20 }}
          />

          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
            <TextField
              name='phone'
              type='text'
              errorText={this.props.personalidErrorText}
              floatingLabelText='เบอร์โทรศัพท์ผู้ป่วย'
              maxLength='10'
              onChange={this.props._handleChangeValue}
              style={{ width: 200, marginRight: 20 }}
            />
            <TextField
              name='career'
              type='text'
              errorText={this.props.personalidErrorText}
              floatingLabelText='อาชีพปัจจุบัน'
              onChange={this.props._handleChangeValue}
              style={{ width: 200, marginRight: 20 }}
            />
          </div>

          <div style={styles.header}>
            ข้อมูลสำหรับติดต่อญาติผู้ป่วย
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='cousin_name'
              type='text'
              errorText={this.props.personalidErrorText}
              floatingLabelText='ชื่อ-นามสกุล'
              onChange={this.props._handleChangeValue}
              style={{ width: 350, marginRight: 20 }}
            />
            <TextField
              name='cousin_phone'
              type='text'
              errorText={this.props.personalidErrorText}
              floatingLabelText='เบอร์ติดต่อ'
              maxLength='10'
              onChange={this.props._handleChangeValue}
              style={{ width: 200, marginRight: 20 }}
            />
          </div>

          <CardActions>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <RaisedButton type='submit' label='บันทึก' primary style={{ width: 120 }} />
            </div>
          </CardActions>
        </form>
      </Card>
    )
  }
}

const styles = {
  container: {
    width: '60%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: 10
  },
  topContent: {
    padding: 10,
    marginBottom: 10,
    borderStyle: 'ridge',
    borderRadius: 10,
    borderColor: cyan500,
    backgroundColor: grey200
  },
  header: {
    textAlign: 'center'
  },
  notation: {
    fontSize: 12,
    color: grey600
  },
  boldText: {
    fontWeight: 'bold'
  },
  form: {
    padding: '0 1em 1em 1em'
  },
  radioButton: {
    display: 'inline-block',
    width: '100px'
  },
  radioButtonGroup: {
    display: 'inline-block',
    marginRight: 10
  }
}
