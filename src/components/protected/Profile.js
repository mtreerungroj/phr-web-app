import React, { Component } from 'react'
import { getUserStatus } from '../../services/helpers'

export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authed: false,
      isLoading: true,
      userid: '',
      profile: {}
    }
  }

  componentDidMount () {
    const that = this
    getUserStatus().then(res => that.setState(res)).catch(res => that.setState(res))
  }

  renderStaffProfile = () => <div>Staff profile</div>

  renderPatientProfile = () => <div>Patient profile</div>

  render () {
    console.log(this.state)
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div>
        {this.state.profile.role === 'doctor' || this.state.profile.role === 'nurse' ? this.renderStaffProfile() : this.renderPatientProfile()}
      </div>
  }
}
