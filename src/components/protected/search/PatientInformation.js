import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

import { grey300, grey500, grey600 } from 'material-ui/styles/colors'
import { getPatientStatus, updateProfile, uploadFileToStorage } from '../../../services/helpers'
import { gender, _status, race, region, bloodTypes } from '../../../services/enum'

import DialogProfile from './DialogProfile'
import UploadFile from './UploadFile'
import GeneralProfile from './GeneralProfile'
import HealthProdile from './HealthProfile'

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
        admit_date,
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
        surgery_sapheneous_vein,
        blood_type,
        weight,
        height,
        bmi
      } = await this.state
      profile = await {
        patient_code,
        admit_date,
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
        surgery_sapheneous_vein,
        blood_type,
        weight,
        height,
        bmi
      }
    }

    updateProfile(this.props.userid, profile)
      .then(async res => {
        await this.setState(res)
        this.setState({ isShowSnackbar: true, SnackbarMessage: 'อัพเดทข้อมูลสำเร็จ' })
        // if (this.state.isComplete) window.location.href = '/search'
      })
      .catch(res => this.setState(res))
  }

  handleDialogUploadFileOpen = () => this.setState({ isUploadFileDialogOpen: true })

  handleDialogUploadFileClose = () => this.setState({ isUploadFileDialogOpen: false, file: null })

  handleDialogCloseWithSubmit = () => {
    if (this.state.file != null) {
      uploadFileToStorage(this.props.userid, this.state.file)
        .then(async res => {
          this.setState(res)
          this.setState({ isUploadFileDialogOpen: false })
          await this.updateUserStatus()
        })
        .catch(res => this.setState(res))
    } else {
      this.setState({ isShowSnackbar: true, SnackbarMessage: 'เกิดข้อผิดพลาด กรุณาเลือกรูปภาพก่อน' })
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
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={{ backgroundColor: grey300, paddingBottom: 40 }}>
        <div style={styles.container}>
          <DialogProfile
            {...this.state}
            handleUploadFile={this.handleUploadFile}
            handleSnackbarClose={this.handleSnackbarClose}
            handleDialogUploadFileClose={this.handleDialogUploadFileClose}
            handleDialogCloseWithSubmit={this.handleDialogCloseWithSubmit}
            _handleCloseConfirmDialog={this._handleCloseConfirmDialog}
            _handleCloseConfirmDialogWithSubmit={this._handleCloseConfirmDialogWithSubmit}
            _handleCloseValidateDialog={this._handleCloseValidateDialog}
            />

          <UploadFile styles={styles} {...this.state} handleDialogUploadFileOpen={this.handleDialogUploadFileOpen} />

          <form>
            <div style={styles.header}>ข้อมูลประวัติส่วนตัว (กรอกทั้งหมด)</div>
            <GeneralProfile
              styles={styles}
              {...this.state}
              menuItems={this.menuItems}
              _handleSelectFieldChangeValue={this._handleSelectFieldChangeValue}
              _handleChangeValue={this._handleChangeValue}
              _handleDatePickerChangeValue={this._handleDatePickerChangeValue}
              />

            <br /><div style={styles.header}>ข้อมูลทางสุขภาพ</div>
            <HealthProdile
              styles={styles}
              {...this.state}
              menuItems={this.menuItems}
              _handleSelectFieldChangeValue={this._handleSelectFieldChangeValue}
              _handleChangeValue={this._handleChangeValue}
              _handleOnToggle={this._handleOnToggle}
              />

            <div style={styles.button}>
              <RaisedButton label='อัพเดทข้อมูล' onClick={this._handleOpenConfirmDialog} primary />
            </div>

            <div align='left' style={{ lineHeight: '2em' }}>

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
