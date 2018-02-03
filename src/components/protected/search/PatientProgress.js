import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import RaisedButton from 'material-ui/RaisedButton'

import { getPatientStatus, getActivityResult } from '../../../services/helpers'
import { grey300, red500, cyan500 } from 'material-ui/styles/colors'
import { convertDateFormat } from '../../../services/utils'

let results = []
let dates = []
let pointColors = []

const data = {
  labels: dates,
  datasets: [
    {
      label: 'ระดับกิจกรรมสูงสุดที่ทำได้',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: cyan500,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: pointColors,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: pointColors,
      pointHoverBorderColor: pointColors,
      pointHoverBorderWidth: 5,
      pointRadius: 1,
      pointHitRadius: 10,
      data: results
    }
  ]
}

export default class PatientProgress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      isFetchDataComplete: false
    }
  }

  async componentDidMount () {
    await getPatientStatus(this.props.userid)
      .then(async res => {
        await this.setState(res)
        let today = await new Date().toISOString().substring(0, 10)
        await getActivityResult(this.state.userid, this.state.profile.admit_date, today).then(res => this.setState(res)).catch(res => this.setState(res))
        this.prepareDataForLineChart()
      })
      .catch(res => this.setState(res))
  }

  prepareDataForLineChart = async () => {
    results.length = 0
    dates.length = 0
    pointColors.length = 0

    const activityResults = this.state.activityResults
    await activityResults.forEach(async result => {
      let data = await result[Object.keys(result)[0]].activity_result_1.result

      // dates.push(data.date + ', ' + data.time.substring(0, 5)) // with time
      let date = convertDateFormat(Object.keys(result)[0].split('_')[2])
      let level = data.result.maxLevel || 0
      let color = Object.keys(data.result).length === 0 ? red500 : cyan500

      dates.push(date)
      results.push(level)
      pointColors.push(color)
    })
    this.setState({ isFetchDataComplete: true })
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : !this.state.isFetchDataComplete
          ? <div>Loading data...</div>
          : <div style={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <RaisedButton label='< ย้อนกลับ' onClick={this.props.handleBackButton} style={{ marginBottom: 20 }} />
              <div style={{ width: '80%', textAlign: 'center' }}> พัฒนาการของผู้ป่วย: {this.state.profile.firstname + ' ' + this.state.profile.lastname}</div>
            </div>
            <div style={{ height: 400 }}>
              <Line
                data={data}
                width={400}
                height={400}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          max: 7,
                          min: 0,
                          stepSize: 1
                        },
                        scaleLabel: {
                          display: true,
                          labelString: 'ระดับขั้นที่ทำได้ (level)'
                        }
                      }
                    ],
                    xAxes: [
                      {
                        scaleLabel: {
                          display: true,
                          labelString: 'วันที่ (วัน/เดือน/ปี)'
                        }
                      }
                    ]
                  },
                  title: { display: 'title', text: 'ผลการทำกิจกรรมของผู้ป่วย' }
                }}
                />
            </div>
              คำอธิบาย: <span style={{ color: red500, fontSize: 20 }}>•</span> ผู้ป่วยไม่ผ่านแบบทดสอบความพร้อมก่อนเริ่มทำกิจกรรม{' '}
          </div>
  }
}

const styles = {
  container: {
    backgroundColor: grey300,
    padding: 20,
    width: '90%',
    margin: 'auto'
  }
}
