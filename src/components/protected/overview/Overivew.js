import React, { Component } from 'react'
import { getPieChartData } from '../../../services/helpers'

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
    return this.state.isLoading ? <div>Loading...</div> : <div>PieChart</div>
  }
}
