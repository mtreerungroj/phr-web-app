import React, { Component } from 'react'

export default class PatientInformation extends Component {
  render () {
    return <div>patient information: {this.props.patient_code}</div>
  }
}
