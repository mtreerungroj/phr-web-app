import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
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
      data: {},
      isShowLevel0: false,
      isShowLevel1: false,
      isShowLevel2: false,
      isShowLevel3: false,
      isShowLevel4: false,
      isShowLevel5: false,
      isShowLevel6: false,
      isShowLevel7: false
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

  renderPatientInLevel = level => {
    const patients = dataLevel['dataLevel' + level]
    for (var patient in patients) {
      return <div style={styles.marginLeft}>{'- '}{patients[patient].firstname} {' '} {patients[patient].lastname}</div>
    }
  }

  renderLevelDetail = level => (
    <div>
      <div style={styles.marginTop}>
        {level === 0 && ('ผู้ป่วยที่ยังไม่เริ่มทำกิจกรรม: ' + count[level] + ' คน ')}
        {level > 0 && ('ผู้ป่วยที่ทำได้ถึงระดับ ' + level + ': ' +  + count[level] + ' คน ')}
        {count[level] > 0 &&
          <FlatButton
            label={this.state['isShowLevel' + level] ? 'ซ่อนรายชื่อ' : 'แสดงรายชื่อ'}
            primary
            onClick={() => this.setState({ ['isShowLevel' + level]: !this.state['isShowLevel' + level] })}
          />}
      </div>
      <div style={{ display: this.state['isShowLevel' + level] ? '' : 'none' }}>
        {this.renderPatientInLevel(level)}
      </div>
    </div>
  )

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={styles.container}>
        <div style={styles.inner}>
          <div style={styles.header}>แผนภูมิแสดงจำนวนผู้ป่วยแบ่งตามระดับขั้นกิจกรรมปัจจุบันที่ทำได้</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={styles.chart}>
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
            {this.renderLevelDetail(0)}
            {this.renderLevelDetail(1)}
            {this.renderLevelDetail(2)}
            {this.renderLevelDetail(3)}
            {this.renderLevelDetail(4)}
            {this.renderLevelDetail(5)}
            {this.renderLevelDetail(6)}
            {this.renderLevelDetail(7)}
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
  }
}
