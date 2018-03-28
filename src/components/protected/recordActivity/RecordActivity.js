import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import InformationForm from './Information.form'
import PreActivityForm from './PreActivity.from'
import PostActivityForm from './PostActivity.form'
import ResultActivityForm from './Result.form'

import {
  getUserStatus,
  getPatientList,
  getPatientStatus,
  recordActivityResult
} from '../../../services/helpers'
import { formatActivityData, convertDateFormat } from '../../../services/utils'

import { grey300 } from 'material-ui/styles/colors'

export default class RecordActivity extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      isComplete: false,
      isDialogOpen: false,
      isConfirmDialogOpen: false
    }
  }

  async componentDidMount () {
    const that = this
    await getPatientList()
      .then(async patientsData => {
        let patients = []
        for (let patient of patientsData.data) {
          let data = await patient[Object.keys(patient)[0]].patient_code
          let level = 0

          await getPatientStatus(data.userid)
            .then(async patientStatus => {
              level = patientStatus.profile.level
            })
            .catch(res => console.log('catch', res))
          await patients.push({
            patient_code: data.patient_code,
            gender: data.gender === 'women' ? 'หญิง' : 'ชาย',
            firstname: data.firstname,
            lastname: data.lastname,
            admit_date: convertDateFormat(data.admit_date),
            level: level,
            userid: data.userid
          })
        }
        await that.setState({ patients })
      })
      .catch(res => that.setState(res))

    await getUserStatus()
      .then(res => this.setState(res))
      .catch(res => this.setState(res))
  }

  _handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

  _handleSelectFieldChangeValue = (event, index, value, key) =>
    this.setState({ [key]: value })

  _handleDatePickerChangeValue = async (date, key) => {
    let real_date = new Date(date)
    await real_date.setDate(real_date.getDate() + 1)
    date = await date.toISOString().substring(0, 10)
    real_date = await real_date.toISOString().substring(0, 10)
    this.setState({ [key]: date, real_date })
  }

  _handleRadioButtonChangeValue = (event, value, key) =>
    this.setState({ [key]: value })

  _handleOnCheckCheckbox = (event, value, key) =>
    this.setState({ [key]: value })

  _handleTimePickerChangeValue = async (date, key) => {
    let real_time = new Date(date)
    await real_time.setTime(real_time.getTime() + 7 * 60 * 60 * 1000)
    date = await date.toISOString().substring(11, 19)
    real_time = await real_time.toISOString().substring(11, 19)
    this.setState({ [key]: date, real_time })
  }

  _handleChangeManualValue = (key, value) => {
    this.setState({ [key]: value })
  }

  _handleOnSubmit = async () => {
    let data = await formatActivityData(this.state)
    recordActivityResult(data)
      .then(res =>
        this.setState({
          ...res,
          isDialogOpen: true,
          dialogMessage: 'บันทึกข้อมูลย้อนหลังสำเร็จ',
          messageDetail: 'ระบบจะนำท่านไปสู่หน้าแสดงผู้ป่วยทั้งหมด'
        })
      )
      .catch(res =>
        this.setState({
          ...res,
          isDialogOpen: true,
          dialogMessage: 'เกิดข้อผิดพลาด',
          messageDetail: 'กรุณากรอกข้อมูลอย่างถูกต้อง และลองใหม่อีกครั้ง'
        })
      )
  }

  _handleConfirmDialogOpen = () => {
    this.setState({ isConfirmDialogOpen: true })
  }

  _handleConfirmDialogclose = () => {
    this.setState({ isConfirmDialogOpen: false })
  }

  validateForm = () => {
    if (
      (this.state.patientid &&
        this.state.real_date &&
        this.state.real_time &&
        this.state.durationMinutes &&
        this.state.borg &&
        this.state.assistant &&
        this.state.postBp &&
        this.state.postHr &&
        this.state.preBp &&
        this.state.preHr &&
        this.state.maxLevel &&
        this.state.completedLevel) !== '' &&
      this.state.borg >= 0 &&
      this.state.borg <= 13 &&
      this.state.assistant >= 0 &&
      this.state.durationMinutes > 0
    ) {
      return 1
    }
    return 0
  }

  _handleConfirmDialogcloseWithSubmit = () => {
    this.setState({ isConfirmDialogOpen: false })
    this.validateForm()
      ? this._handleOnSubmit()
      : this.setState({
        isDialogOpen: true,
        dialogMessage: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        messageDetail: 'กรุณาตรวจสอบว่าท่านได้กรอกข้อมูลดังต่อไปนี้แล้ว: ผู้ป่วยที่ต้องการบันทึกผล, วันและเวลาที่ทำกิจกรรม, ระยะเวลาที่ใช้ทำกิจกรรม, อัตราการเต้นของหัวใจและความดันเลือดก่อนและหลังทำกิจกรรม, ระดับความเหนื่อย, จำนวนผู้ช่วยเหลือ และระดับขั้นที่ผู้ป่วยทำสำเร็จหรือไม่สำเร็จ'
      })
  }

  _handleDialogClose = () => {
    this.setState({ isDialogOpen: false })
    this.state.isComplete && (window.location.href = '/search')
  }

  render () {
    console.log(this.state)
    const actions = [
      <FlatButton
        label='ตกลง'
        primary
        keyboardFocused
        onClick={this._handleDialogClose}
      />
    ]
    const confirmActions = [
      <FlatButton
        label='ยกเลิก'
        primary
        keyboardFocused
        onClick={this._handleConfirmDialogclose}
      />,
      <FlatButton
        label='ยืนยัน'
        primary
        keyboardFocused
        onClick={this._handleConfirmDialogcloseWithSubmit}
      />
    ]

    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'nurse' &&
          this.state.profile.role !== 'doctor'
          ? <div>Inaccessible</div>
          : <div style={styles.container}>
            <div style={styles.inner}>
              <div style={styles.header}>
                  บันทึกผลการทำกิจกรรมฟื้นฟูสมรรถภาพห้วใจของผู้ป่วยย้อนหลัง
                </div>
            </div>
            <Dialog
              title={this.state.dialogMessage}
              actions={actions}
              modal={false}
              open={this.state.isDialogOpen}
              onRequestClose={this.handleClose}
              >
              {this.state.messageDetail}
            </Dialog>
            <Dialog
              title='ยืนยันการบันทึกผลการทำกิจกรรม'
              actions={confirmActions}
              modal={false}
              open={this.state.isConfirmDialogOpen}
              onRequestClose={this.handleClose}
              >
                ข้อมูลที่บันทึกไม่สามารถเปลี่ยนแปลงได้ภายหลัง กรุณากด ยืนยัน เพื่อบันทึกข้อมูล
              </Dialog>
            <div style={styles.content}>
              <InformationForm
                {...this.state}
                patients={this.state.patients}
                _handleSelectFieldChangeValue={
                    this._handleSelectFieldChangeValue
                  }
                _handleDatePickerChangeValue={
                    this._handleDatePickerChangeValue
                  }
                _handleTimePickerChangeValue={
                    this._handleTimePickerChangeValue
                  }
                _handleChangeValue={this._handleChangeValue}
                />
              <PreActivityForm
                {...this.state}
                _handleChangeValue={this._handleChangeValue}
                _handleOnCheckCheckbox={this._handleOnCheckCheckbox}
                />
              <PostActivityForm
                {...this.state}
                _handleChangeValue={this._handleChangeValue}
                _handleChangeManualValue={this._handleChangeManualValue}
                />
              <ResultActivityForm
                {...this.state}
                _handleSelectFieldChangeValue={
                    this._handleSelectFieldChangeValue
                  }
                _handleChangeValue={this._handleChangeValue}
                _handleRadioButtonChangeValue={
                    this._handleRadioButtonChangeValue
                  }
                />
              <div style={{ textAlign: 'center' }}>
                <RaisedButton
                  label='บันทึกข้อมูล'
                  primary
                  onClick={this._handleConfirmDialogOpen}
                  />
              </div>
            </div>
          </div>
  }
}

const styles = {
  container: {
    backgroundColor: grey300,
    display: 'flex',
    flexDirection: 'column'
  },
  inner: {
    flex: 1
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  content: {
    maxWidth: '90%',
    width: '70%',
    alignSelf: 'center',
    marginBottom: 40
  }
}
