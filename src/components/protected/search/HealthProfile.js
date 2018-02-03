import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker'
import { bloodTypes } from '../../../services/enum'
import { grey200, grey400 } from 'material-ui/styles/colors'

export default class HealthProfile extends Component {
  render () {
    return (
      <div>
        <DatePicker
          floatingLabelText='วันที่รับผู้ป่วยเข้าโรงพยาบาล'
          container='inline'
          mode='landscape'
          defaultDate={new Date(this.props.admit_date)}
          maxDate={new Date()}
          autoOk
          openToYearSelection
          onChange={(foo, date) => this.props._handleDatePickerChangeValue(date, 'admit_date')}
          underlineStyle={this.props.styles.underlineStyle}
          underlineFocusStyle={this.props.styles.underlineStyle}
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SelectField
            value={this.props.blood_type}
            floatingLabelText='หมู่เลือด *'
            onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'blood_type')}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ width: 150, marginRight: 20 }}
          >
            {this.props.menuItems(bloodTypes)}
          </SelectField>
          <TextField
            name='weight'
            type='number'
            defaultValue={this.props.weight}
            errorText={this.props.weight === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='น้ำหนัก (กิโลกรัม) *'
            maxLength='3'
            onChange={this.props._handleChangeValue}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ width: 150, marginRight: 20 }}
          />
          <TextField
            name='height'
            type='number'
            defaultValue={this.props.height}
            errorText={this.props.height === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='ส่วนสูง (เซนติเมตร) *'
            maxLength='3'
            onChange={this.props._handleChangeValue}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ width: 150, marginRight: 20 }}
          />
          <TextField
            name='bmi'
            type='text'
            value={this.props.bmi}
            floatingLabelText='ค่าค่าดัชนีมวลกาย'
            disabled
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ width: 150, marginRight: 20 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            name='medical_condition'
            type='text'
            defaultValue={this.props.medical_condition}
            errorText={this.props.medical_condition === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='โรคประจำตัว'
            onChange={this.props._handleChangeValue}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            fullWidth
            style={{ marginRight: 20 }}
          />
          <TextField
            name='current_medicine'
            type='text'
            defaultValue={this.props.current_medicine}
            errorText={this.props.current_medicine === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='ยาที่ใช้ปัจจุบัน'
            onChange={this.props._handleChangeValue}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            fullWidth
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            name='allergic_medicine'
            type='text'
            defaultValue={this.props.allergic_medicine}
            errorText={this.props.allergic_medicine === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='ยาที่แพ้'
            onChange={this.props._handleChangeValue}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            style={{ marginRight: 20 }}
            fullWidth
          />
          <TextField
            name='allergic_food'
            type='text'
            defaultValue={this.props.allergic_food}
            errorText={this.props.allergic_food === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='อาหารที่แพ้'
            onChange={this.props._handleChangeValue}
            underlineStyle={this.props.styles.underlineStyle}
            underlineFocusStyle={this.props.styles.underlineStyle}
            fullWidth
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
          <Toggle
            name='is_smoking'
            label='ประวัติการสูบบุหรี่ (เคย/ไม่เคย)'
            defaultToggled={typeof this.props.is_smoking === 'boolean' ? this.props.is_smoking : false}
            onToggle={this.props._handleOnToggle}
            style={{ marginRight: 10 }}
            thumbStyle={{ backgroundColor: grey200 }}
            trackStyle={{ backgroundColor: grey400 }}
          />
          <Toggle
            name='is_lung_disease'
            label='ประวัติการเป็นโรคทางปอด (เคย/ไม่เคย)'
            defaultToggled={typeof this.props.is_lung_disease === 'boolean' ? this.props.is_lung_disease : false}
            onToggle={this.props._handleOnToggle}
            thumbStyle={{ backgroundColor: grey200 }}
            trackStyle={{ backgroundColor: grey400 }}
            style={{ marginLeft: 10 }}
          />
        </div>
        <TextField
          name='surgery_sapheneous_vein'
          type='number'
          defaultValue={this.props.surgery_sapheneous_vein || 0}
          errorText={this.props.allergic_food === undefined ? 'กรุณากรอกข้อมูล' : ''}
          floatingLabelText='จำนวนเส้นเลือด Sapheneous vein ที่นำมาทำทางเบี่ยง'
          onChange={this.props._handleChangeValue}
          underlineStyle={this.props.styles.underlineStyle}
          underlineFocusStyle={this.props.styles.underlineStyle}
          style={{ width: 400 }}
        />
      </div>
    )
  }
}
