import React, { Component } from 'react'
import { getPieChartData } from '../../../services/helpers'
import { Pie } from 'react-chartjs-2'

import { grey300 } from 'material-ui/styles/colors'

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
}

export default class Overview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      data: []
    }
  }

  async componentDidMount () {
    await getPieChartData().then(res => this.setState({ data: res, isLoading: false })).catch(res => this.setState({ data: res, isLoading: false }))
  }

  render () {
    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={styles.container}>
        <div style={styles.inner}>
          <div style={styles.header}>แผนภูมิแสดงจำนวนผู้ป่วยแบ่งตามระดับขั้นกิจกรรมปัจจุบันที่ทำได้</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={styles.inner}>
            <Pie
              data={data}
              width={400}
              height={400}
              options={{
                maintainAspectRatio: false
              }}
              />
          </div>
          <div style={styles.inner}>555</div>
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
  }
}
