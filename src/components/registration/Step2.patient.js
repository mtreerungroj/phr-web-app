import React, { Component } from 'react'
import { Card, CardActions } from 'material-ui/Card'
import { grey200, grey600, cyan500 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker'

import { gender, _status, race, region } from '../../services/enum'

export default class Step2Patient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isConfirmDialogOpen: false,
      confirmDialogMessage: 'คุณสามารถแก้ไขข้อมูลประวัติส่วนตัวได้ในภายหลัง',
      isValidateDialogOpen: false,
      ValidateDialogMessage: 'กรุณากรอกข้อมูลให้ครบก่อนจะบันทึกข้อมูล'
    }
  }

  componentDidMount () {
    this.props._handleChangeManualValue('role', 'patient')
  }

  _handleSelectFieldChangeValue = (event, index, value, key) => this.props._handleChangeManualValue(key, value)

  _handleDatePickerChangeValue = async (date, key) => {
    // await date.setDate(date.getDate() + 1)
    const full_date = date
    date = await date.toISOString().substring(0, 10)
    this.props._handleChangeManualValue(key, date)
    this.props._handleChangeManualValue(`${key}_full`, full_date)
  }

  menuItems (items) {
    return items.map(item => <MenuItem key={item.id} value={item.id} label={item.name} primaryText={item.name} />)
  }

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
      (this.props.id_card &&
        this.props.gender &&
        this.props.firstname &&
        this.props.lastname &&
        this.props.birthdate &&
        this.props.status &&
        this.props.race &&
        this.props.region) === undefined ||
      this.props.id_card.length < 13
    ) {
      this.setState({ isValidateDialogOpen: true })
      return 0
    }
    return 1
  }

  _handleCloseConfirmDialogWithSubmit = e => {
    this.validateForm() && this.props._handleChangeLevel(3)
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
          กรอกข้อมูลประวัติส่วนตัวทั่วไป
        </div>

        <form style={{ width: '80%', margin: 'auto' }} onSubmit={this._handleOpenConfirmDialog}>

          <div>
            <TextField
              name='id_card'
              type='text'
              errorText={this.props.personalidErrorText}
              floatingLabelText='รหัสบัตรประชาชน'
              maxLength='13'
              onChange={this.props._handleChangeValue}
              style={{ width: 200, marginRight: 20 }}
            />
            <span style={styles.notation}>
              (หมายเหตุ: รหัสบัตรประชาชนไม่สามารถเปลี่ยนแปลงได้ในภายหลัง)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={this.props.gender}
              floatingLabelText='เพศ'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'gender')}
              style={{ width: 220, marginRight: 20 }}
            >
              {this.menuItems(gender)}
            </SelectField>
            <TextField
              name='firstname'
              type='text'
              errorText={this.props.firstnameErrorText}
              floatingLabelText='ชื่อ'
              onChange={this.props._handleChangeValue}
              fullWidth
              style={{ marginRight: 20 }}
            />

            <TextField
              name='lastname'
              type='text'
              errorText={this.props.lastnameErrorText}
              floatingLabelText='นามสกุล'
              onChange={this.props._handleChangeValue}
              fullWidth
            />
          </div>

          <DatePicker
            floatingLabelText='วันเกิด'
            container='inline'
            mode='landscape'
            maxDate={new Date()}
            autoOk
            openToYearSelection
            onChange={(foo, date) => this._handleDatePickerChangeValue(date, 'birthdate')}
            style={{ width: 200, marginRight: 20 }}
          />

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={this.props.status}
              floatingLabelText='สถานะ'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'status')}
              style={{ width: 400, marginRight: 20 }}
            >
              {this.menuItems(_status)}
            </SelectField>

            <SelectField
              value={this.props.race}
              floatingLabelText='เชื้อชาติ'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'race')}
              style={{ width: 400, marginRight: 20 }}
            >
              {this.menuItems(race)}
            </SelectField>

            <SelectField
              value={this.props.region}
              floatingLabelText='ศาสนา'
              onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'region')}
              style={{ width: 400 }}
            >
              {this.menuItems(region)}
            </SelectField>
          </div>

          <CardActions>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <RaisedButton type='submit' label='ต่อไป' primary style={{ width: 120 }} />
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
