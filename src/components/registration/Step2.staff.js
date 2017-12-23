import React, { Component } from 'react'
import { Card, CardActions } from 'material-ui/Card'
import { grey200, grey600, cyan500 } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

const hospitals = [
  { hospitalid: '13779', name: 'รพ.สงขลานครินทร์ วิทยาเขตหาดใหญ่' },
  { hospitalid: '10682', name: 'รพ.หาดใหญ่' },
  { hospitalid: '10745', name: 'รพ.สงขลา' },
  { hospitalid: '11527', name: 'รพ.ค่ายเสนาณรงค์' }
]

export default class Step2Staff extends Component {
  _handleChangeValue = (event, index, value) => this.props._handleChangeManualValue('hospitalid', value)

  menuItems (hospitals) {
    return hospitals.map(hospital => <MenuItem key={hospital.hospitalid} value={hospital.hospitalid} label={hospital.name} primaryText={hospital.name} />)
  }

  render () {
    console.log(this.props)
    return (
      <Card style={styles.container}>
        <div style={styles.topContent}>
          อีเมล: <span style={styles.boldText}>{this.props.email}</span>
          <br />
          รหัส PIN: <span style={styles.boldText}>(get from server)</span>
          <br />
          <div style={styles.notation}>
            หมายเหตุ: โปรดจดจำรหัส PIN นี้ เนื่องจากระบบจะใช้รหัส PIN สำหรับยืนยันตัวตนของคุณ
          </div>
        </div>

        <div style={styles.header}>
          กรอกข้อมูลประวัติส่วนตัวเพื่อสิ้นสุดการลงทะเบียน
        </div>

        <form style={{ width: '80%', margin: 'auto' }} onSubmit={this._handleOpenDialog}>
          <SelectField value={this.props.hospitalid} floatingLabelText='โรงพยาบาล' onChange={this._handleChangeValue} maxHeight={200} style={{ width: 300 }}>
            {this.menuItems(hospitals)}
          </SelectField>

          <div>
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
  }
}
