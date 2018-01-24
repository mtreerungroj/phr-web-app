import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import PieChart from './PieChart'
import LineChart from './LineChart'

import { getUserStatus } from '../../../services/helpers'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
}

export default class Overview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      slideIndex: 0
    }
  }

  async componentDidMount () {
    await getUserStatus().then(res => this.setState(res)).catch(res => this.setState(res))
  }

  handleChange = value => {
    this.setState({
      slideIndex: value
    })
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'nurse' && this.state.profile.role !== 'doctor'
          ? <div>Inaccessible</div>
          : <div>
            <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
              <Tab label='Pie Chart: จำนวนผู้ป่วยแบ่งตามระดับขั้นปัจจุบันที่ทำได้' value={0} />
              <Tab label='Line Chart: เปรียบเทียบผู้ป่วยแต่ละราย' value={1} />
            </Tabs>
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
              <div>
                <PieChart />
              </div>
              <div style={styles.slide}>
                <LineChart />
              </div>
            </SwipeableViews>
          </div>
  }
}
