import React, { Component } from 'react'
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

  _handleSelectFieldChangeValue = (event, index, value, key) =>
    this.setState({ [key]: value })

  render () {
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
                />
              <PreActivityForm />
              <PostActivityForm />
              <ResultActivityForm />
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
    marginLeft: 30,
    marginRight: 30
  }
}
