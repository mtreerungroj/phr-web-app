import React, { Component } from 'react'

import { getUserStatus } from '../../../services/helpers'

export default class RecordActivity extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    await getUserStatus()
      .then(res => this.setState(res))
      .catch(res => this.setState(res))
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'nurse' &&
          this.state.profile.role !== 'doctor'
          ? <div>Inaccessible</div>
          : <div>
              บันทึกย้อนหลัง
            </div>
  }
}
