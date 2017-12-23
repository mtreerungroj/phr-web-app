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
      isDialogOpen: false,
      dialogMessage: 'คุณสามารถแก้ไขข้อมูลประวัติส่วนตัวได้ในภายหลัง'
    }
  }

  _handleSelectFieldChangeValue = (event, index, value) => this.props._handleChangeManualValue('hospitalid', value)

  _handleRadioButtonGroupChangeValue = (event, value) => this.props._handleChangeManualValue('role', value)

  menuItems (hospitals) {
    return hospitals.map(hospital => <MenuItem key={hospital.hospitalid} value={hospital.hospitalid} label={hospital.name} primaryText={hospital.name} />)
  }

  _handleOpenDialog = e => {
    e.preventDefault()
    this.setState({ isDialogOpen: true })
  }

  _handleCloseDialog = e => {
    this.setState({ isDialogOpen: false })
  }

  _handleCloseDialogWithSubmit = e => {
    this.props.updateProfile()
    this.setState({ isDialogOpen: false })
  }

  render () {
    const actions = [
      <FlatButton label='ยกเลิก' primary onClick={this._handleCloseDialog} />,
      <FlatButton label='ยืนยัน' primary keyboardFocused onClick={this._handleCloseDialogWithSubmit} />
    ]
    return (
      <Card style={styles.container}>
        <Dialog title='ยืนยันการลงทะเบียน' actions={actions} modal={false} open={this.state.isDialogOpen} onRequestClose={this._handleCloseDialog}>
          {this.state.dialogMessage}
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

        <form style={{ width: '80%', margin: 'auto' }} onSubmit={this._handleOpenDialog}>
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
