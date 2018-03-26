import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

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
      let id = patient.patient_code
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
    console.log(this.props.patients)
    return this.state.isLoading
      ? <div>กำลังโหลดข้อมูล...</div>
      : <div style={styles.container}>
        <div><b>ข้อมูลเบื้องต้น</b></div>
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
          style={{ width: 400 }}
          >
          {this.menuItems(patients)}
        </SelectField>
      </div>
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
}
