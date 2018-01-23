import React, { Component } from 'react'

import { getUserStatus, getActivityResult } from '../../../services/helpers'

export default class Progress extends Component {
  componentDidMount () {
    getUserStatus().then(res => this.setState(res)).catch(res => this.setState(res))
  }

  render () {
    console.log(this.state)
    return <div>progress here</div>
  }
}
