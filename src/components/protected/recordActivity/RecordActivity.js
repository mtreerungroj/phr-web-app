import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import InformationForm from './Information.form'
import PreActivityForm from './PreActivity.from'
import PostActivityForm from './PostActivity.form'
import ResultActivityForm from './Result.form'

import {
  getUserStatus,
  getPatientList,
  getPatientStatus
} from '../../../services/helpers'
import { convertDateFormat } from '../../../services/utils'

import { grey300 } from 'material-ui/styles/colors'

export default class RecordActivity extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    const that = this
    await getPatientList()
      .then(async patientsData => {
        let patients = []
        for (let patient of patientsData.data) {
          let data = await patient[Object.keys(patient)[0]].patient_code
          let level = 0

          await getPatientStatus(data.userid)
            .then(async patientStatus => {
              level = patientStatus.profile.level
            })
            .catch(res => console.log('catch', res))
          await patients.push({
            patient_code: data.patient_code,
            gender: data.gender === 'women' ? 'หญิง' : 'ชาย',
            firstname: data.firstname,
            lastname: data.lastname,
            admit_date: convertDateFormat(data.admit_date),
            level: level,
            userid: data.userid
          })
        }
        await that.setState({ patients })
      })
      .catch(res => that.setState(res))

    await getUserStatus()
      .then(res => this.setState(res))
      .catch(res => this.setState(res))
  }

  _handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  _handleSelectFieldChangeValue = (event, index, value, key) =>
    this.setState({ [key]: value })

  _handleDatePickerChangeValue = async (date, key) => {
    let real_date = new Date(date)
    await real_date.setDate(real_date.getDate() + 1)
    date = await date.toISOString().substring(0, 10)
    real_date = await real_date.toISOString().substring(0, 10)
    this.setState({ [key]: date, real_date })
  }

  _handleRadioButtonChangeValue = (event, value, key) =>
    this.setState({ [key]: value })

  _handleOnCheckCheckbox = (event, value, key) =>
    this.setState({ [key]: value })

  _handleTimePickerChangeValue = async (date, key) => {
    let real_time = new Date(date)
    await real_time.setTime(real_time.getTime() + 7 * 60 * 60 * 1000)
    date = await date.toISOString().substring(11, 19)
    real_time = await real_time.toISOString().substring(11, 19)
    this.setState({ [key]: date, real_time })
  }

  render () {
    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'nurse' &&
          this.state.profile.role !== 'doctor'
          ? <div>Inaccessible</div>
          : <div style={styles.container}>
            <div style={styles.inner}>
              <div style={styles.header}>
                  บันทึกผลการทำกิจกรรมฟื้นฟูสมรรถภาพห้วใจของผู้ป่วยย้อนหลัง
                </div>
            </div>
            <div style={styles.content}>
              <InformationForm
                {...this.state}
                patients={this.state.patients}
                _handleSelectFieldChangeValue={
                    this._handleSelectFieldChangeValue
                  }
                _handleDatePickerChangeValue={
                    this._handleDatePickerChangeValue
                  }
                _handleTimePickerChangeValue={
                    this._handleTimePickerChangeValue
                  }
                _handleChangeValue={this._handleChangeValue}
                />
              <PreActivityForm
                {...this.state}
                _handleChangeValue={this._handleChangeValue}
                _handleOnCheckCheckbox={this._handleOnCheckCheckbox}
                />
              <PostActivityForm
                {...this.state}
                _handleChangeValue={this._handleChangeValue}
                />
              <ResultActivityForm
                {...this.state}
                _handleSelectFieldChangeValue={
                    this._handleSelectFieldChangeValue
                  }
                _handleChangeValue={this._handleChangeValue}
                _handleRadioButtonChangeValue={
                    this._handleRadioButtonChangeValue
                  }
                />
              <div style={{ textAlign: 'center' }}>
                <RaisedButton label='บันทึกข้อมูล' primary />
              </div>
            </div>
          </div>
  }
}

const styles = {
  container: {
    backgroundColor: grey300,
    display: 'flex',
    flexDirection: 'column'
  },
  inner: {
    flex: 1
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  content: {
    maxWidth: '90%',
    width: '70%',
    alignSelf: 'center',
    marginBottom: 40
  }
}
