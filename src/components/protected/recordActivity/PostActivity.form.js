import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

import { grey500 } from 'material-ui/styles/colors'

export default class PostActivityForm extends Component {
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
        <div><b>ข้อมูลหลังการทำกิจกรรมเสร็จสิ้น</b></div>
        <div style={{ ...styles.rowDirection, marginBottom: 20 }}>
          <TextField
            name='postHR'
            type='number'
            floatingLabelText='อัตราการเต้นของหัวใจ (bpm)'
            maxLength='3'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 300, marginRight: 40 }}
            />
          <TextField
            name='postBP'
            type='text'
            floatingLabelText='ความดันเลือด (Systolic/Diastolic)'
            maxLength='7'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 300 }}
            />
        </div>
        <div style={{ ...styles.rowDirection, marginBottom: 20 }}>
          <TextField
            name='borg'
            type='number'
            floatingLabelText='ระดับความเหนื่อยของผู้ป่วย (Borg scale: 1-13)'
            inputprops={{ min: 1, max: 13, step: 1 }}
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 400, marginRight: 40 }}
            />
          <TextField
            name='assistant'
            type='number'
            floatingLabelText='จำนวนผู้ช่วยเหลือ (คน)'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 300, marginRight: 40 }}
            />
        </div>
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
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  }
}
