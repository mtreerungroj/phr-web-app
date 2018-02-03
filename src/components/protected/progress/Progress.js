import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

import { getUserStatus, getActivityResult } from '../../../services/helpers'
import { grey300 } from 'material-ui/styles/colors'

let results = []
let dates = []

const data = {
  labels: dates,
  datasets: [
    {
      label: 'ผลการทำกิจกรรมของผู้ป่วย',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: results
    }
  ]
}

const convertDateFormat = inputDate => {
  let date = new Date(inputDate)
  if (!isNaN(date.getTime())) {
    return date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear()
  }
}

export default class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      isFetchDataComplete: false
    }
  }

  async componentDidMount () {
    await getUserStatus()
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
    const activityResults = this.state.activityResults
    await activityResults.forEach(async result => {
      let data = await result[Object.keys(result)[0]].activity_result_1.result

      // dates.push(data.date + ', ' + data.time.substring(0, 5)) // with time
      let date = convertDateFormat(Object.keys(result)[0].split('_')[2])
      let level = data.result.maxLevel || 0

      dates.push(date)
      results.push(level)
    })
    this.setState({ isFetchDataComplete: true })
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'patient'
          ? <div>Inaccessible</div>
          : !this.state.isFetchDataComplete
              ? <div>Loading data...</div>
              : <div style={styles.container}>
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
