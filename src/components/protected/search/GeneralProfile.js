import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import DatePicker from 'material-ui/DatePicker'
import { gender, _status, race, region } from '../../../services/enum'

export default class GeneralProfile extends Component {
  render () {
    let date = new Date()
    if (this.props.birthdate) {
      date = new Date(this.props.birthdate)
      date.setDate(date.getDate() + 1)
    } else this._handleDatePickerChangeValue(date, 'birthdate')

    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            name='email'
            floatingLabelText='อีเมลที่ใช้ลงทะเบียน'
            value={this.props.email}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            fullWidth
            disabled
            style={{ marginRight: 10 }}
          />
          <TextField
            name='id_card'
            floatingLabelText='รหัสบัตรประชาชน'
            value={this.props.id_card}
            errorText={this.props.id_card === undefined ? 'กรุณาติดต่อพยาบาลเพื่อกรอกข้อมูลนี้' : ''}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            fullWidth
            style={{ marginLeft: 10 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SelectField
            value={this.props.gender}
            floatingLabelText='เพศ'
            onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'gender')}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
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
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
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
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SelectField
            value={this.props.status}
            floatingLabelText='สถานะ'
            onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'status')}
            fullWidth
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ marginRight: 10 }}
          >
            {this.props.menuItems(_status)}
          </SelectField>
          <SelectField
            value={this.props.race}
            floatingLabelText='เชื้อชาติ'
            onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'race')}
            fullWidth
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            {this.props.menuItems(race)}
          </SelectField>
          <SelectField
            value={this.props.region}
            floatingLabelText='ศาสนา'
            onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'region')}
            fullWidth
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
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
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ marginRight: 10 }}
          />
          <TextField
            name='career'
            type='text'
            defaultValue={this.props.career}
            errorText={this.props.career === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='อาชีพปัจจุบัน'
            onChange={this.props._handleChangeValue}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ width: 200, marginLeft: 10 }}
          />
        </div>
        <br /> <div style={this.props.styles.header}>ข้อมูลการติดต่อ (กรอกทั้งหมด)</div>
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
          underlineStyle={this.props.styles.underlineStyle}
          underlineFocusStyle={this.props.styles.underlineStyle}
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
          underlineStyle={this.props.styles.underlineStyle}
          underlineFocusStyle={this.props.styles.underlineStyle}
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
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
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
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ width: 200, marginRight: 20 }}
          />
        </div>
      </div>
    )
  }
}
