import React, { Component } from 'react'
import { getPieChartData } from '../../../services/helpers'
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
  labels: ['ยังไม่เริ่มทำกิจกรรม', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7'],
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

export default class Overview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      data: {}
      // count: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  async componentDidMount () {
    await getPieChartData()
      .then(res => {
        this.setState({ data: res })
        this.computeDataForChart()
      })
      .catch(res => this.setState({ data: res, isLoading: false }))
  }

  computeDataForChart = async () => {
    let patients = this.state.data
    for (let userid in patients) {
      let level = await patients[userid].level
      await count[parseInt(level, 10)]++
      await dataLevel['dataLevel' + level].push(patients[userid])
    }
    this.setState({ isLoading: false })
    console.log(count)
    console.log(dataLevel)
  }

  render () {
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
          <div style={styles.inner}>
              ผู้ป่วยที่ยังไม่เริ่มทำกิจกรรม: {count[0]} คน
              ผู้ป่วยที่ทำได้ถึงระดับ 1: {count[1]} คน
              ผู้ป่วยที่ทำได้ถึงระดับ 2: {count[2]} คน
              ผู้ป่วยที่ทำได้ถึงระดับ 3: {count[3]} คน
              ผู้ป่วยที่ทำได้ถึงระดับ 4: {count[4]} คน
              ผู้ป่วยที่ทำได้ถึงระดับ 5: {count[5]} คน
              ผู้ป่วยที่ทำได้ถึงระดับ 6: {count[6]} คน
              ผู้ป่วยที่ทำได้ถึงระดับ 7: {count[7]} คน
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
  }
}
