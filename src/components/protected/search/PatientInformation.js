import React, { Component } from 'react'

export default class PatientInformation extends Component {
  render () {
    return !this.props.isSelectPatient ? <div>เกิดข้อผิดพลาด ลองใหม่นะ</div> : <div>patient information: {this.props.userid}</div>
  }
}
