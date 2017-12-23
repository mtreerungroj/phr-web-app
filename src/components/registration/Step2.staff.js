import React, { Component } from 'react'
import { Card, CardActions } from 'material-ui/Card'
import { grey200, grey600, cyan500 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const hospitals = [
  { hospitalid: '13779', name: 'รพ.สงขลานครินทร์ วิทยาเขตหาดใหญ่' },
  { hospitalid: '10682', name: 'รพ.หาดใหญ่' },
  { hospitalid: '10745', name: 'รพ.สงขลา' },
  { hospitalid: '11527', name: 'รพ.ค่ายเสนาณรงค์' }
]

export default class Step2Staff extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isConfirmDialogOpen: false,
      confirmDialogMessage: 'คุณสามารถแก้ไขข้อมูลประวัติส่วนตัวได้ในภายหลัง',
      isValidateDialogOpen: false,
      ValidateDialogMessage: 'กรุณากรอกข้อมูลให้ครบก่อนจะบันทึกข้อมูล'
    }
  }

  _handleSelectFieldChangeValue = (event, index, value) => this.props._handleChangeManualValue('hospitalid', value)

  _handleRadioButtonGroupChangeValue = (event, value) => this.props._handleChangeManualValue('role', value)

  menuItems (hospitals) {
    return hospitals.map(hospital => <MenuItem key={hospital.hospitalid} value={hospital.hospitalid} label={hospital.name} primaryText={hospital.name} />)
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
    if ((this.props.hospitalid && this.props.role && this.props.personalid && this.props.firstname && this.props.lastname && this.props.phone) === undefined) {
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
          title='ยืนยันการลงทะเบียน'
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
          รหัส PIN: <span style={styles.boldText}>(get from server) {'   '}</span>
          <span style={styles.notation}>
            (หมายเหตุ: โปรดจดจำรหัส PIN นี้ เนื่องจากระบบจะใช้รหัส PIN สำหรับยืนยันตัวตนของคุณ)
          </span>
        </div>

        <div style={styles.header}>
          กรอกข้อมูลประวัติส่วนตัวเพื่อสิ้นสุดการลงทะเบียน
        </div>

        <form style={{ width: '80%', margin: 'auto' }} onSubmit={this._handleOpenConfirmDialog}>
          <SelectField
            value={this.props.hospitalid}
            floatingLabelText='โรงพยาบาล'
            onChange={this._handleSelectFieldChangeValue}
            maxHeight={200}
            style={{ width: 300 }}
          >
            {this.menuItems(hospitals)}
          </SelectField>

          <div>
            <RadioButtonGroup name='role' defaultSelected={this.props.role} onChange={this._handleRadioButtonGroupChangeValue} style={styles.radioButtonGroup}>
              <RadioButton value='doctor' label='แพทย์' style={styles.radioButton} />
              <RadioButton value='nurse' label='พยาบาล' style={styles.radioButton} />
            </RadioButtonGroup>
            <TextField
              name='personalid'
              type='text'
              errorText={this.props.personalidErrorText}
              floatingLabelText='รหัสประจำตัว'
              onChange={this.props._handleChangeValue}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='firstname'
              type='text'
              errorText={this.props.firstnameErrorText}
              floatingLabelText='ชื่อ'
              onChange={this.props._handleChangeValue}
              fullWidth
              style={{ marginRight: 10 }}
            />

            <TextField
              name='lastname'
              type='text'
              errorText={this.props.lastnameErrorText}
              floatingLabelText='นามสกุล'
              onChange={this.props._handleChangeValue}
              fullWidth
              style={{ marginLeft: 10 }}
            />
          </div>

          <TextField
            name='phone'
            type='text'
            errorText={this.props.phoneErrorText}
            floatingLabelText='เบอร์โทรศัพท์'
            onChange={this.props._handleChangeValue}
          />

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
