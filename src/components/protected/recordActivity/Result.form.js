import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField'

import { grey500 } from 'material-ui/styles/colors'
import { activityLevel } from '../../../services/enum'

export default class ResultForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: false })
  }

  menuItems = items =>
    items.map(item => (
      <MenuItem
        key={item.id}
        value={item.id}
        label={item.name}
        primaryText={item.name}
      />
    ))

  render () {
    return this.state.isLoading
      ? <div>กำลังโหลดข้อมูล...</div>
      : <div style={styles.container}>
        <div><b>สรุปผลการทำกิจกรรม (กรุณากรอกทั้งหมด)</b></div>
        <div style={styles.rowDirection}>
          <SelectField
            value={this.props.maxLevel}
            floatingLabelText='ระดับขั้นที่ผู้ป่วยทำได้สูงสุด (1-7)'
            onChange={(event, index, value) =>
                this.props._handleSelectFieldChangeValue(
                  event,
                  index,
                  value,
                  'maxLevel'
                )}
            maxHeight={200}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 300, marginRight: 40, marginBottom: 20 }}
            >
            {this.menuItems(activityLevel)}
          </SelectField>
        </div>
        {'ผู้ป่วยทำกิจกรรมขั้นนี้สำเร็จหรือไม่?'}
        <RadioButtonGroup
          name='completedLevel'
          onChange={(event, value) =>
              this.props._handleRadioButtonChangeValue(
                event,
                value,
                'completedLevel'
              )}
          style={{
            ...styles.rowDirection,
            width: 300,
            marginTop: 20,
            marginBottom: 10
          }}
          >
          <RadioButton value label='สำเร็จ' />
          <RadioButton value={false} label='ไม่สำเร็จ' />
        </RadioButtonGroup>
        {'หมายเหตุอื่นๆ: '}
        <TextField
          hintText='บันทึกอื่นๆ เช่น อาการเพิ่มเติม หรือสิ่งช่วยจำ'
          multiLine
          rows={1}
          rowsMax={4}
          fullWidth
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
          />
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
