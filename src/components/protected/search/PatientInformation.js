import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'

import { grey200, grey300, grey400, grey500, grey600 } from 'material-ui/styles/colors'
import { getPatientStatus, updateProfile, uploadFileToStorage } from '../../../services/helpers'
import { gender, _status, race, region, bloodTypes } from '../../../services/enum'

import GeneralProfile from './GeneralProfile'

export default class PatientInformation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authed: false,
      isLoading: true,
      userid: '',
      email: '',
      profile: {},
      isConfirmDialogOpen: false,
      confirmDialogMessage: 'คุณสามารถแก้ไขข้อมูลประวัติส่วนตัวได้ในภายหลัง',
      isValidateDialogOpen: false,
      ValidateDialogMessage: 'กรุณากรอกข้อมูลให้ครบก่อนจะบันทึกข้อมูล',
      isDialogOpen: false,
      isUploadFileDialogOpen: false,
      file: null,
      isShowSnackbar: false,
      SnackbarMessage: ''
    }
  }

  async componentDidMount () {
    await this.updateUserStatus()
  }

  updateUserStatus = async () => {
    await getPatientStatus(this.props.userid)
      .then(async res => {
        await this.setState({ ...res.profile })
        await this.setState(res)
      })
      .catch(res => this.setState(res))

    !Object.keys(this.state.profile).length && this.initiateProfile()
    if (this.state.gender === undefined) this.setState({ gender: gender[0].id })
    if (this.state.status === undefined) this.setState({ status: _status[0].id })
    if (this.state.race === undefined) this.setState({ race: race[0].id })
    if (this.state.region === undefined) this.setState({ region: region[0].id })
    if (this.state.blood_type === undefined) this.setState({ blood_type: bloodTypes[0].id })

    if (this.state.is_smoking === 'true') this.setState({ is_smoking: true })
    else if (this.state.is_smoking === 'false') this.setState({ is_smoking: false })
    else this.setState({ is_smoking: false })
    if (this.state.is_lung_disease === 'true') this.setState({ is_lung_disease: true })
    else if (this.state.is_lung_disease === 'false') this.setState({ is_lung_disease: false })
    else this.setState({ is_lung_disease: false })

    if (this.state.allergic_food === undefined) this.setState({ allergic_food: '' })
    if (this.state.allergic_medicine === undefined) this.setState({ allergic_medicine: '' })
    if (this.state.current_medicine === undefined) this.setState({ current_medicine: '' })
    if (this.state.medical_condition === undefined) this.setState({ medical_condition: '' })
  }

  initiateProfile = () => this.setState({ gender: gender[0].id, status: _status[0].id, race: race[0].id, region: region[0].id, blood_type: bloodTypes[0].id })

  menuItems = items => items.map(item => <MenuItem key={item.id} value={item.id} label={item.name} primaryText={item.name} />)

  _handleSelectFieldChangeValue = (event, index, value, key) => this.setState({ [key]: value })

  _handleDatePickerChangeValue = async (date, key) => {
    // await date.setDate(date.getDate() + 1)
    const full_date = date
    const full_key = `${key}_full`
    date = await date.toISOString().substring(0, 10)
    this.setState({ [key]: date, [full_key]: full_date })
  }

  _handleChangeValue = async e => {
    let key = e.target.name
    await this.setState({ [e.target.name]: e.target.value })
    if (key === 'weight' || key === 'height') this.calculateBMI()
  }

  validateForm = () => {
    if (this.state.role === 'patient') {
      if (
        (this.state.address &&
          this.state.career &&
          this.state.cousin_name &&
          this.state.cousin_phone &&
          this.state.phone &&
          this.state.gender &&
          this.state.firstname &&
          this.state.lastname &&
          this.state.birthdate &&
          this.state.status &&
          this.state.race &&
          this.state.region) !== '' &&
        this.state.phone.length === 10 &&
        this.state.cousin_phone.length === 10
      ) {
        return 1
      }
    }
    this.setState({ isValidateDialogOpen: true })
    return 0
  }

  _handleOpenConfirmDialog = e => this.validateForm() && this.setState({ isConfirmDialogOpen: true })

  _handleCloseConfirmDialog = e => this.setState({ isConfirmDialogOpen: false })

  _handleCloseConfirmDialogWithSubmit = e => {
    this._updateProfile()
    this.setState({ isConfirmDialogOpen: false })
  }

  _handleCloseValidateDialog = e => this.setState({ isValidateDialogOpen: false })

  _updateProfile = async () => {
    let profile = {}
    if (this.state.role === 'patient') {
      let {
        patient_code,
        id_card,
        role,
        gender,
        firstname,
        lastname,
        birthdate,
        status,
        race,
        region,
        address,
        career,
        phone,
        cousin_name,
        cousin_phone,
        medical_condition,
        current_medicine,
        allergic_food,
        allergic_medicine,
        is_smoking,
        is_lung_disease,
        blood_type,
        weight,
        height,
        bmi
      } = await this.state
      profile = await {
        patient_code,
        id_card,
        role,
        gender,
        firstname,
        lastname,
        birthdate,
        status,
        race,
        region,
        address,
        career,
        phone,
        cousin_name,
        cousin_phone,
        medical_condition,
        current_medicine,
        allergic_food,
        allergic_medicine,
        is_smoking: is_smoking.toString(),
        is_lung_disease: is_lung_disease.toString(),
        blood_type,
        weight,
        height,
        bmi
      }
    }

    updateProfile(this.props.userid, profile)
      .then(async res => {
        await this.setState(res)
        // if (this.state.isComplete) window.location.href = '/search'
      })
      .catch(res => this.setState(res))
  }

  handleDialogUploadFileOpen = () => this.setState({ isDialogUploadFileOpen: true })

  handleDialogUploadFileClose = () => this.setState({ isDialogUploadFileOpen: false, file: null })

  handleDialogCloseWithSubmit = () => {
    if (this.state.file != null) {
      uploadFileToStorage(this.props.userid, this.state.file)
        .then(async res => {
          this.setState(res)
          await this.updateUserStatus()
        })
        .catch(res => this.setState(res))
    } else {
      this.setState({ isDialogOpen: false, isShowSnackbar: true, SnackbarMessage: 'เกิดข้อผิดพลาด กรุณาเลือกรูปภาพก่อน' })
    }
  }

  handleSnackbarClose = () => this.setState({ isShowSnackbar: false, SnackbarMessage: '' })

  handleUploadFile = e => this.setState({ file: e.target.files[0] })

  _handleOnToggle = (e, value) => this.setState({ [e.target.name]: value })

  calculateBMI = () => {
    if (this.state.weight !== undefined && this.state.height !== undefined && this.state.weight.length !== 0 && this.state.height.length !== 0) {
      const weight = parseInt(this.state.weight, 10)
      const height = parseInt(this.state.height, 10) / 100
      const bmi = weight / (height * height)
      this.setState({ bmi: bmi.toFixed(2).toString() })
    } else this.setState({ bmi: 0 })
  }

  render () {
    let date = new Date()
    if (this.state.birthdate) {
      date = new Date(this.state.birthdate)
      date.setDate(date.getDate() + 1)
    } else this._handleDatePickerChangeValue(date, 'birthdate')

    const actions = [
      <FlatButton label='ยกเลิก' primary onClick={this.handleDialogUploadFileClose} />,
      <FlatButton label='บันทึก' primary keyboardFocused onClick={this.handleDialogCloseWithSubmit} />
    ]
    const confirmActions = [
      <FlatButton label='ยกเลิก' primary onClick={this._handleCloseConfirmDialog} />,
      <FlatButton label='ยืนยัน' primary keyboardFocused onClick={this._handleCloseConfirmDialogWithSubmit} />
    ]
    const validateActions = [<FlatButton label='ตกลง' primary onClick={this._handleCloseValidateDialog} />]

    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={{ backgroundColor: grey300, paddingBottom: 40 }}>
        <div style={styles.container}>
          <Dialog
            title='เลือกรูปโปรไฟล์ของคุณ'
            actions={actions}
            modal={false}
            open={this.state.isUploadFileDialogOpen}
            onRequestClose={this.handleUploadFileDialogClose}
            >
            <input type='file' onChange={this.handleUploadFile} />
          </Dialog>
          <Dialog
            title='ยืนยันการบันทึกข้อมูล'
            actions={confirmActions}
            modal={false}
            open={this.state.isConfirmDialogOpen}
            onRequestClose={this._handleCloseConfirmDialog}
            >
            {this.state.confirmDialogMessage}
          </Dialog>
          <Dialog
            title='เกิดข้อผิดพลาด'
            actions={validateActions}
            modal={false}
            open={this.state.isValidateDialogOpen}
            onRequestClose={this._handleCloseConfirmDialog}
            >
            {this.state.ValidateDialogMessage}
          </Dialog>
          <Snackbar open={this.state.isShowSnackbar} message={this.state.SnackbarMessage} autoHideDuration={3000} onRequestClose={this.handleSnackbarClose} />
          <div style={styles.inner}>
            <img
              src={this.state.picture_uri !== undefined ? this.state.picture_uri : require('../../../assets/images/default-profile-picture.png')}
              alt=''
              style={{ maxWidth: '200px', width: '100%', height: 'auto', marginBottom: 10 }}
              />
            <br />
            <RaisedButton label='เปลี่ยนรูปโปรไฟล์' onClick={this.handleDialogUploadFileOpen} primary />
          </div>
          <form>
            <div style={styles.header}>ข้อมูลประวัติส่วนตัว (กรอกทั้งหมด)</div>

            <GeneralProfile
              styles={styles}
              {...this.state}
              date={date}
              menuItems={this.menuItems}
              _handleSelectFieldChangeValue={this._handleSelectFieldChangeValue}
              _handleChangeValue={this._handleChangeValue}
              _handleDatePickerChangeValue={this._handleDatePickerChangeValue}
              />

            <br /><div style={styles.header}>ข้อมูลทางสุขภาพ</div>

            <div align='left' style={{ lineHeight: '2em' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <SelectField
                  value={this.state.blood_type}
                  floatingLabelText='หมู่เลือด *'
                  onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'blood_type')}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  style={{ width: 150, marginRight: 20 }}
                  >
                  {this.menuItems(bloodTypes)}
                </SelectField>
                <TextField
                  name='weight'
                  type='number'
                  defaultValue={this.state.weight}
                  errorText={this.state.weight === undefined ? 'กรุณากรอกข้อมูล' : ''}
                  floatingLabelText='น้ำหนัก (กิโลกรัม) *'
                  maxLength='3'
                  onChange={this._handleChangeValue}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  style={{ width: 150, marginRight: 20 }}
                  />
                <TextField
                  name='height'
                  type='number'
                  defaultValue={this.state.height}
                  errorText={this.state.height === undefined ? 'กรุณากรอกข้อมูล' : ''}
                  floatingLabelText='ส่วนสูง (เซนติเมตร) *'
                  maxLength='3'
                  onChange={this._handleChangeValue}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  style={{ width: 150, marginRight: 20 }}
                  />
                <TextField
                  name='bmi'
                  type='text'
                  value={this.state.bmi}
                  floatingLabelText='ค่าค่าดัชนีมวลกาย'
                  disabled
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  style={{ width: 150, marginRight: 20 }}
                  />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  name='medical_condition'
                  type='text'
                  defaultValue={this.state.medical_condition}
                  errorText={this.state.medical_condition === undefined ? 'กรุณากรอกข้อมูล' : ''}
                  floatingLabelText='โรคประจำตัว'
                  onChange={this._handleChangeValue}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  fullWidth
                  style={{ marginRight: 20 }}
                  />
                <TextField
                  name='current_medicine'
                  type='text'
                  defaultValue={this.state.current_medicine}
                  errorText={this.state.current_medicine === undefined ? 'กรุณากรอกข้อมูล' : ''}
                  floatingLabelText='ยาที่ใช้ปัจจุบัน'
                  onChange={this._handleChangeValue}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  fullWidth
                  />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  name='allergic_medicine'
                  type='text'
                  defaultValue={this.state.allergic_medicine}
                  errorText={this.state.allergic_medicine === undefined ? 'กรุณากรอกข้อมูล' : ''}
                  floatingLabelText='ยาที่แพ้'
                  onChange={this._handleChangeValue}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  style={{ marginRight: 20 }}
                  fullWidth
                  />
                <TextField
                  name='allergic_food'
                  type='text'
                  defaultValue={this.state.allergic_food}
                  errorText={this.state.allergic_food === undefined ? 'กรุณากรอกข้อมูล' : ''}
                  floatingLabelText='อาหารที่แพ้'
                  onChange={this._handleChangeValue}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  fullWidth
                  />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
                <Toggle
                  name='is_smoking'
                  label='ประวัติการสูบบุหรี่ (เคย/ไม่เคย)'
                  defaultToggled={typeof this.state.is_smoking === 'boolean' ? this.state.is_smoking : false}
                  onToggle={this._handleOnToggle}
                  style={{ marginRight: 10 }}
                  thumbStyle={{ backgroundColor: grey200 }}
                  trackStyle={{ backgroundColor: grey400 }}
                  />
                <Toggle
                  name='is_lung_disease'
                  label='ประวัติการเป็นโรคทางปอด (เคย/ไม่เคย)'
                  defaultToggled={typeof this.state.is_lung_disease === 'boolean' ? this.state.is_lung_disease : false}
                  onToggle={this._handleOnToggle}
                  thumbStyle={{ backgroundColor: grey200 }}
                  trackStyle={{ backgroundColor: grey400 }}
                  style={{ marginLeft: 10 }}
                  />
              </div>

              <div style={styles.button}>
                <RaisedButton label='อัพเดทข้อมูล' onClick={this._handleOpenConfirmDialog} primary />
              </div>

              <br /><div style={styles.header}>ข้อมูลเกี่ยวกับการรักษา/ผ่าตัด</div> <br />
                วันที่รับผู้ป่วยเข้าโรงพยาบาล: {'2017-12-31'} <br />
                ประเภทของโรคหัวใจ: {'โรคหลอดเลือดหัวใจอุดตัน'} <br />
                ระดับความรุนแรงของโรคหัวใจ (1-4): {'4'} <br />
                ประสิทธิภาพการบีบตัวของกล้ามเนื้อหัวใจ: {'น้อยกว่า 40%'} <br />
                -------------------------------------------------- <br />
                วันและเวลาที่ทำการผ่าตัดหัวใจ: {'2018-01-08, 14:30 น.'} <br />
                ประเภทการผ่าตัดหัวใจ: {'CABG'} <br />
                ระยะเวลาในการผ่าตัด: {'40 '} นาที <br />
                ระยะเวลาที่ใช้เครื่องปอดและหัวใจเทียม: {'10'} นาที <br />
                ระยะเวลาการหนีบหลอดเลือดแดงใหญ่เอออร์ตา (Aorta): {'15'} นาที <br />
                ระยะเวลาที่ใส่ท่อช่วยหายใจ: {'20'} นาที <br />
                การสูญเสียเลือดระหว่างผ่าตัด: {'0.8'} ลิตร <br />
                จำนวนของเส้นเลือดทั้งหมดที่ทำทางเบี่ยง: {'3'} เส้น ได้แก่ {'1 Sapheneous vein, 1 Radial artery, 1 Internal mammary artery'}<br />
            </div>
          </form>
        </div>
      </div>
  }
}

const styles = {
  container: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '90%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row'
  },
  inner: {
    marginRight: 40,
    paddingRight: 20,
    borderWidth: 0,
    borderRightWidth: 5,
    borderColor: grey600,
    borderStyle: 'dotted',
    textAlign: 'center'
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20
  },
  underlineStyle: {
    borderColor: grey500
  },
  button: {
    paddingTop: 30,
    textAlign: 'center'
  }
}
