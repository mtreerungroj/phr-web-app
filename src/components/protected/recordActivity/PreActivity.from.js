import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

import { grey500 } from 'material-ui/styles/colors'

export default class PreActivityForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: false })
  }

  render () {
    return this.state.isLoading
      ? <div>กำลังโหลดข้อมูล...</div>
      : <div style={styles.container}>
        <div><b>ข้อมูลผู้ป่วยก่อนเริ่มทำกิจกรรม</b></div>
        <div style={{ ...styles.rowDirection, marginBottom: 20 }}>
          <TextField
            name='preHR'
            type='number'
            floatingLabelText='อัตราการเต้นของหัวใจ (bpm)'
            maxLength='3'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 300, marginRight: 40 }}
            />
          <TextField
            name='preBP'
            type='text'
            floatingLabelText='ความดันเลือด (Systolic/Diastolic)'
            maxLength=''
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 300 }}
            />
        </div>
        {
            'ผลการทดสอบความพร้อมก่อนเริ่มทำกิจกรรมของผู้ป่วย (ทำเครื่องหมายหากมีอาการ)'
          }
      </div>
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30
  },
  rowDirection: {
    display: 'flex',
    flexDirection: 'row'
  },
  underlineStyle: {
    borderColor: grey500
  }
}
