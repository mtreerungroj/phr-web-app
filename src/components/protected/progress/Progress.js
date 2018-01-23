import React, { Component } from 'react'

import { getUserStatus, getActivityResult } from '../../../services/helpers'

export default class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    getUserStatus().then(res => this.setState(res)).catch(res => this.setState(res))
  }

  render () {
    console.log(this.state)
    return this.state.isLoading ? <div>Loading...</div> : this.state.profile.role !== 'patient' ? <div>Inaccessible</div> : <div>progress here</div>
  }
}
