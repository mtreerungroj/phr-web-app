import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
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
            floatingLabelText='ระดับขั้นที่ผู้ป่วยทำได้สูงสุด'
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
            style={{ width: 300, marginRight: 40 }}
            >
            {this.menuItems(activityLevel)}
          </SelectField>
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
  }
}
