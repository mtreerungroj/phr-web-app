import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { getPieChartData, getPatientList, getPatientStatus, getActivityResult } from '../../services/helpers'
import { convertDateFormat } from '../../services/utils'
import { Pie } from 'react-chartjs-2'

import {
  grey300,
  grey400,
  purple300,
  indigo300,
  blue300,
  lightGreen300,
  yellow300,
  orange300,
  red300,
  grey500,
  purple400,
  indigo400,
  blue400,
  lightGreen400,
  yellow400,
  orange400,
  red400
} from 'material-ui/styles/colors'

let count = [0, 0, 0, 0, 0, 0, 0, 0] // level 0 - 7

const data = {
  labels: ['ยังไม่เริ่มทำกิจกรรม', 'ระดับขั้น 1', 'ระดับขั้น 2', 'ระดับขั้น 3', 'ระดับขั้น 4', 'ระดับขั้น 5', 'ระดับขั้น 6', 'ระดับขั้น 7'],
  datasets: [
    {
      data: count,
      backgroundColor: [grey400, purple300, indigo300, blue300, lightGreen300, yellow300, orange300, red300],
      hoverBackgroundColor: [grey500, purple400, indigo400, blue400, lightGreen400, yellow400, orange400, red400]
    }
  ]
}

let dataLevel = {
  dataLevel0: [],
  dataLevel1: [],
  dataLevel2: [],
  dataLevel3: [],
  dataLevel4: [],
  dataLevel5: [],
  dataLevel6: [],
  dataLevel7: []
}

const calculateDiffDate = (date_1, date_2) => {
  let date1 = new Date(date_1)
  let date2 = new Date(date_2)
  let timeDiff = Math.abs(date2.getTime() - date1.getTime())
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}

const checkStatus = async (firstDate, today, userLevel) => {
  let diffDate = await calculateDiffDate(firstDate, today)
  if (diffDate >= 5 && userLevel <= 3) return true
  else if (diffDate >= 3 && userLevel <= 1) return true
  return false
}

export default class IndexStaff extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      data: {}
    }
  }

  async componentDidMount () {
    const that = this
    let today = await new Date().toISOString().substring(0, 10)

    await getPatientList()
      .then(async patientsData => {
        let patients = []
        for (let patient of patientsData.data) {
          let data = await patient[Object.keys(patient)[0]].patient_code
          await getPatientStatus(data.userid)
            .then(async patientStatus => {
              let isAlert = false
              await getActivityResult(data.userid, patientStatus.profile.admit_date, today)
                .then(async activityResults => {
                  // check alert in case of 'already start doing activity'
                  // not check if user not start doing activity
                  if (Object.keys(activityResults['activityResults']).length > 0) {
                    let firstResultArray = await activityResults['activityResults'][0]
                    let firstResultData = await firstResultArray[Object.keys(firstResultArray)[0]].activity_result_1.result
                    let firstDate = await firstResultData.date
                    let userLevel = await parseInt(patientStatus.profile.level)
                    isAlert = await checkStatus(firstDate, today, userLevel)
                  }
                })
                .catch(res => console.log('catch', res))
              patients.push({ ...patientStatus.profile, userid: data.userid, isAlert })
            })
            .catch(res => console.log('catch', res))
        }
        that.setState({ patients })
      })
      .catch(res => that.setState(res))

    await getPieChartData()
      .then(res => {
        that.setState({ data: res })
        that.computeDataForChart()
      })
      .catch(res => this.setState({ data: res, isLoading: false }))
  }

  componentWillUnmount () {
    count = [0, 0, 0, 0, 0, 0, 0]
    dataLevel = {
      dataLevel0: [],
      dataLevel1: [],
      dataLevel2: [],
      dataLevel3: [],
      dataLevel4: [],
      dataLevel5: [],
      dataLevel6: [],
      dataLevel7: []
    }
  }

  computeDataForChart = async () => {
    let patients = this.state.data
    for (let userid in patients) {
      let level = await patients[userid].level
      await count[parseInt(level, 10)]++
      await dataLevel['dataLevel' + level].push(patients[userid])
    }
    this.setState({ isLoading: false })
  }

  handleClickToOverview = () => (window.location.href = '/overview')

  handleClickToSearch = () => (window.location.href = '/search')

  render () {
    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={styles.container}>
        <div style={styles.inner}>
          <div style={styles.header}>ภาพรวมของผู้ป่วยทั้งหมด</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={styles.chart}>
            <Pie
              data={data}
              width={300}
              height={300}
              options={{
                maintainAspectRatio: false
              }}
              />
            <div style={styles.buttonContainer}>
              <RaisedButton label='ดูกราฟโดยละเอียด' primary onClick={this.handleClickToOverview} />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 20 }}>
              <RaisedButton label='🔎 ค้นหาผู้ป่วยด้วยชื่อ นามสกุล หรือรหัสผู้ป่วย' primary onClick={this.handleClickToSearch} />
            </div>
              ผู้ป่วยที่ไม่ถึงเกณฑ์
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
  chart: { flex: 1, minWidth: 400, maxWidth: 600, width: '100%' },
  marginTop: {
    marginTop: 10
  },
  marginLeft: {
    marginLeft: 20
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: 20
  }
}
