import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

import { getUserStatus, getActivityResult } from '../../../services/helpers'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
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
      })
      .catch(res => this.setState(res))
  }

  render () {
    console.log(this.state.activityResults)
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'patient' ? <div>Inaccessible</div> : !this.state.isFetchDataComplete ? <div>Loading data...</div> : <Line data={data} />
  }
}
