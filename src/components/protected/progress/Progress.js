import React, { Component } from 'react'

import { getUserStatus, getActivityResult } from '../../../services/helpers'

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
    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'patient'
          ? <div>Inaccessible</div>
          : !this.state.isFetchDataComplete ? <div>Loading data...</div> : <div>progress here</div>
  }
}
