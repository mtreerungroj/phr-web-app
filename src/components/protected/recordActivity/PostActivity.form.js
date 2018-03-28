import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

import { grey500 } from 'material-ui/styles/colors'
import { postConditions } from '../../../services/enum'

export default class PostActivityForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      isCardiacDisorder: false,
      isOtherDisorder: false,
      isRespiratoryDisorder: false
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: false })
  }

  _handleOpenCheckbox = key => this.setState({ [key]: !this.state[key] })

  checkbox = (condition, checked) => (
    <Checkbox
      label={postConditions[condition]}
      checked={this.props[condition]}
      onCheck={(event, value) =>
        this.props._handleOnCheckCheckbox(event, value, condition)}
      style={{ width: 400 }}
    />
  )

  renderCardiacDisorder = () => (
    <div style={{ marginLeft: 40 }}>
      <div style={styles.checkboxContainer}>
        {this.checkbox('PVC_ชนิด_Bigeminy_หรือมาติดกันมากกว่า_2_ถึง_3_ตัว')}
        {this.checkbox('AF_มากกว่าหรือเท่ากับ_100_ครั้งต่อนาที')}
      </div>
      <div style={styles.checkboxContainer}>
        {this.checkbox('SVT')}
        {this.checkbox('Bradycardia_ที่ใช้_pacemaker_VT_หรือ_VF')}
      </div>
      <div style={styles.checkboxContainer}>
        {this.checkbox('มีความผิดปกติของ_stSegment')}
      </div>
    </div>
  )

  renderRespiratoryDisorder = () => (
    <div style={{ marginLeft: 40 }}>
      <div style={styles.checkboxContainer}>
        {this.checkbox('กระสับกระส่าย')}
        {this.checkbox('หายใจลำบาก')}
      </div>
      <div style={styles.checkboxContainer}>
        {this.checkbox(
          'หอบเหนื่อย_อัตราการหายใจมากกว่าหรือเท่ากับ_35_ครั้งต่อนาที'
        )}
        {this.checkbox('SpO2_น้อยกว่าหรือเท่ากับ_93')}
      </div>
      <div style={styles.checkboxContainer}>
        {this.checkbox('PaO2_มากกว่าหรือเท่ากับ_60_mmHg')}
      </div>
    </div>
  )

  renderOtherDisorder = () => (
    <div style={{ marginLeft: 40 }}>
      <div style={styles.checkboxContainer}>
        {this.checkbox('อ่อนเพลีย')}
        {this.checkbox('คลื่นไส้_อาเจียน')}
      </div>
      <div style={styles.checkboxContainer}>
        {this.checkbox('เจ็บแน่นหน้าอก')}
        {this.checkbox('หน้ามืดมึนงง')}
      </div>
      <div style={styles.checkboxContainer}>
        {this.checkbox('เหงื่อออก_ตัวเย็น')}
      </div>
    </div>
  )

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
        {
            'ผู้ป่วยมีอาการดังต่อไปนี้หลังจากทำกิจกรรมเสร็จหรือไม่? (ทำเครื่องหมายหากมีอาการ)'
          }
        <div style={{ marginLeft: 40 }}>

          <Checkbox
            label='เกิดภาวะหัวใจเต้นผิดจังหวะ (กรณีมีเครื่องมอนิเตอร์)'
            onCheck={() => this._handleOpenCheckbox('isCardiacDisorder')}
            />
          {this.state.isCardiacDisorder && this.renderCardiacDisorder()}
          <Checkbox
            label='เกิดภาวะผิดปกติของการหายใจ'
            onCheck={() => this._handleOpenCheckbox('isRespiratoryDisorder')}
            />
          {this.state.isRespiratoryDisorder &&
              this.renderRespiratoryDisorder()}
          <Checkbox
            label='อาการอื่นๆ'
            onCheck={() => this._handleOpenCheckbox('isOtherDisorder')}
            />
          {this.state.isOtherDisorder && this.renderOtherDisorder()}
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
