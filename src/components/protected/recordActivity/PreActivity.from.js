import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

import { grey500 } from 'material-ui/styles/colors'

const conditions = {
  st: 'ST ≥ 120 ครั้ง/นาที',
  pvc: 'PVC ชนิด bigeminy หรือมาติดกันมากกว่า 2-3 ตัว',
  af: 'AF ≥ 100 ครั้ง/นาที',
  svt: 'SVT',
  bradycardia: 'Bradycardia ที่ใช้ pacemaker, VT, VF',
  stSegment: 'มีความผิดปกติของ ST-segment'
}

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

  checkbox = (condition, checked) => (
    <Checkbox
      label={conditions[condition]}
      checked={this.props[condition]}
      onCheck={(event, value) =>
        this.props._handleOnCheckCheckbox(event, value, condition)}
      style={{ width: 400 }}
    />
  )

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

        <div style={{ marginBottom: 10 }}>
            ผลการทดสอบความพร้อมก่อนเริ่มทำกิจกรรมของผู้ป่วย (ทำเครื่องหมายหากมีอาการ)
          </div>
        <div style={{ marginLeft: 40 }}>
          <div>
            {'เกิดภาวะหัวใจเต้นผิดจังหวะ (กรณีมีเครื่องมอนิเตอร์)'}
          </div>
          <div style={styles.checkboxContainer}>
            {this.checkbox('st')}
            {this.checkbox('pvc')}
          </div>
          <div style={styles.checkboxContainer}>
            {this.checkbox('af')}
            {this.checkbox('svt')}
          </div>
          <div style={styles.checkboxContainer}>
            {this.checkbox('bradycardia')}
            {this.checkbox('stSegment')}
          </div>
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
