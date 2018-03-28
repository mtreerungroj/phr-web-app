import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'

import { grey500 } from 'material-ui/styles/colors'

const patients = []

export default class InformationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    const patientsData = await this.props.patients
    await patientsData.map(patient => {
      let id = patient.userid
      let name =
        (patient.gender === 'ชาย' ? 'นาย' : 'นาง') +
        patient.firstname +
        ' ' +
        patient.lastname
      return patients.push({ id, name })
    })
    this.setState({ isLoading: false })
  }

  menuItems = items =>
    items.map(item => (
      <MenuItem
        key={item.id}
        value={item.id}
        label={item.name}
        primaryText={item.name}
      />
    ))

  render () {
    let today = new Date()

    return this.state.isLoading
      ? <div>กำลังโหลดข้อมูล...</div>
      : <div style={styles.container}>
        <div><b>ข้อมูลเบื้องต้น (กรุณากรอกทั้งหมด)</b></div>
        <div style={styles.rowDirection}>
          <SelectField
            value={this.props.patientid}
            floatingLabelText='เลือกผู้ป่วยที่ต้องการบันทึกผล'
            onChange={(event, index, value) =>
                this.props._handleSelectFieldChangeValue(
                  event,
                  index,
                  value,
                  'patientid'
                )}
            maxHeight={200}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 400, marginRight: 40 }}
            >
            {this.menuItems(patients)}
          </SelectField>
          <DatePicker
            floatingLabelText='วันที่ทำกิจกรรม'
            container='inline'
            mode='landscape'
            maxDate={today}
            autoOk
            openToYearSelection
            onChange={(foo, date) =>
                this.props._handleDatePickerChangeValue(date, 'date')}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ marginRight: 10 }}
            />
        </div>
        <div style={{ ...styles.rowDirection, alignItems: 'baseline' }}>
          {'เวลาที่ทำกิจกรรม:'}
          <TimePicker
            format='24hr'
            hintText='เวลาที่ทำกิจกรรม'
            autoOk
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ marginRight: 40, marginLeft: 20 }}
            onChange={(foo, date) =>
                this.props._handleTimePickerChangeValue(date, 'time')}
            />
          <TextField
            name='durationMinutes'
            type='number'
            floatingLabelText='ระยะเวลาที่ใช้ทำกิจกรรม (นาที)'
            maxLength='10'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 200 }}
            />
        </div>
      </div>
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30
  },
  rowDirection: {
    display: 'flex',
    flexDirection: 'row'
  },
  underlineStyle: {
    borderColor: grey500
  }
}
