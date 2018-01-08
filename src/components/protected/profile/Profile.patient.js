import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import { grey500 } from 'material-ui/styles/colors'

import { gender, _status, race, region } from '../../../services/enum'

export default class PatientProfile extends Component {
  render () {
    console.log(this.props)
    let date = new Date()
    if (this.props.birthdate) date = new Date(this.props.birthdate)
    else this.props._handleDatePickerChangeValue(date, 'birthdate')

    return (
      <div style={styles.container}>
        <div style={styles.header}>ข้อมูลประวัติส่วนตัว</div>
        <form>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='email'
              floatingLabelText='อีเมลที่ใช้ลงทะเบียน'
              value={this.props.email}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginRight: 10 }}
            />
            <TextField
              name='id_card'
              floatingLabelText='รหัสบัตรประชาชน'
              value={this.props.id_card}
              errorText={this.props.id_card === undefined ? 'กรุณาติดต่อพยาบาลเพื่อกรอกข้อมูลนี้' : ''}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginLeft: 10 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={this.props.gender}
              floatingLabelText='เพศ'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'gender')}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 220, marginRight: 20 }}
            >
              {this.props.menuItems(gender)}
            </SelectField>
            <TextField
              name='firstname'
              type='text'
              floatingLabelText='ชื่อ'
              value={this.props.firstname}
              errorText={this.props.firstname === undefined ? 'กรุณากรอกข้อมูล' : ''}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 20 }}
            />

            <TextField
              name='lastname'
              type='text'
              floatingLabelText='นามสกุล'
              value={this.props.lastname}
              errorText={this.props.lastname === undefined ? 'กรุณากรอกข้อมูล' : ''}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={this.props.status}
              floatingLabelText='สถานะ'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'status')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 10 }}
            >
              {this.props.menuItems(_status)}
            </SelectField>

            <SelectField
              value={this.props.race}
              floatingLabelText='เชื้อชาติ'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'race')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              {this.props.menuItems(race)}
            </SelectField>

            <SelectField
              value={this.props.region}
              floatingLabelText='ศาสนา'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'region')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginLeft: 10 }}
            >
              {this.props.menuItems(region)}
            </SelectField>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DatePicker
              floatingLabelText='วันเกิด'
              container='inline'
              mode='landscape'
              defaultDate={date}
              maxDate={new Date()}
              autoOk
              openToYearSelection
              onChange={(foo, date) => this.props._handleDatePickerChangeValue(date, 'birthdate')}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 10 }}
            />
            <TextField
              name='career'
              type='text'
              defaultValue={this.props.career}
              errorText={this.props.career === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='อาชีพปัจจุบัน'
              onChange={this.props._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200, marginLeft: 10 }}
            />
          </div>
          <br /> <div style={styles.header}>ข้อมูลการติดต่อ</div>
          <TextField
            name='address'
            type='text'
            defaultValue={this.props.address}
            errorText={this.props.address === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='ที่อยู่ปัจจุบัน'
            rows={2}
            rowsMax={4}
            multiLine
            fullWidth
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ marginRight: 20 }}
          />
          <TextField
            name='phone'
            type='text'
            defaultValue={this.props.phone}
            errorText={this.props.phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='เบอร์โทรศัพท์ผู้ป่วย'
            maxLength='10'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 200 }}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='cousin_name'
              type='text'
              defaultValue={this.props.cousin_name}
              errorText={this.props.cousin_name === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='ชื่อ-นามสกุล ญาติผู้ป่วย'
              onChange={this.props._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 350, marginRight: 20 }}
            />
            <TextField
              name='cousin_phone'
              type='text'
              defaultValue={this.props.cousin_phone}
              errorText={this.props.cousin_phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='เบอร์ติดต่อญาติผู้ป่วย'
              maxLength='10'
              onChange={this.props._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200, marginRight: 20 }}
            />
          </div>
          <div style={styles.button}>
            <RaisedButton label='บันทึก' onClick={this.props._handleOpenConfirmDialog} primary style={{ width: 120 }} />
          </div>
        </form>

      </div>
    )
  }
}

const styles = {
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '50%',
    margin: 'auto'
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  underlineStyle: {
    borderColor: grey500
  },
  button: {
    paddingTop: 30,
    textAlign: 'center'
  }
}
