import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import Snackbar from 'material-ui/Snackbar'
import MenuItem from 'material-ui/MenuItem'

import { grey300, grey500, grey600 } from 'material-ui/styles/colors'
import { getPatientStatus, updateProfile, uploadFileToStorage } from '../../../services/helpers'
import { gender, _status, race, region } from '../../../services/enum'

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
      file: null,
      isShowSnackbar: false,
      SnackbarMessage: ''
    }
  }

  async componentDidMount () {
    const that = this
    await getPatientStatus(this.props.userid)
      .then(async res => {
        await that.setState({ ...res.profile })
        await that.setState(res)
      })
      .catch(res => that.setState(res))

    !Object.keys(this.state.profile).length && this.initiateProfile()
  }

  updateUserStatus = () => {
    getPatientStatus(this.props.userid)
      .then(async res => {
        await this.setState({ ...res.profile })
        await this.setState(res)
      })
      .catch(res => this.setState(res))

    !Object.keys(this.state.profile).length && this.initiateProfile()
  }

  initiateProfile = () => this.setState({ gender: gender[0].id, status: _status[0].id, race: race[0].id, region: region[0].id })

  menuItems = items => items.map(item => <MenuItem key={item.id} value={item.id} label={item.name} primaryText={item.name} />)

  _handleSelectFieldChangeValue = (event, index, value, key) => this.setState({ [key]: value })

  _handleDatePickerChangeValue = async (date, key) => {
    // await date.setDate(date.getDate() + 1)
    const full_date = date
    const full_key = `${key}_full`
    date = await date.toISOString().substring(0, 10)
    this.setState({ [key]: date, [full_key]: full_date })
  }

  _handleChangeValue = e => this.setState({ [e.target.name]: e.target.value })

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
        cousin_phone
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
        cousin_phone
      }
    }

    updateProfile(this.props.userid, profile)
      .then(async res => {
        await this.setState(res)
        // if (this.state.isComplete) window.location.href = '/search'
      })
      .catch(res => this.setState(res))
  }

  handleDialogOpen = () => this.setState({ isDialogOpen: true })

  handleDialogClose = () => this.setState({ isDialogOpen: false, file: null })

  handleDialogCloseWithSubmit = () => {
    if (this.state.file != null) {
      uploadFileToStorage(this.props.userid, this.state.file)
        .then(res => {
          this.setState(res)
          this.updateUserStatus()
        })
        .catch(res => this.setState(res))
    } else {
      this.setState({ isDialogOpen: false, isShowSnackbar: true, SnackbarMessage: 'เกิดข้อผิดพลาด กรุณาเลือกรูปภาพก่อน' })
    }
  }

  handleSnackbarClose = () => this.setState({ isShowSnackbar: false, SnackbarMessage: '' })

  handleUploadFile = e => this.setState({ file: e.target.files[0] })

  render () {
    console.log(this.state)
    let date = new Date()
    if (this.state.birthdate) {
      date = new Date(this.state.birthdate)
      date.setDate(date.getDate() + 1)
    } else this._handleDatePickerChangeValue(date, 'birthdate')

    const actions = [
      <FlatButton label='ยกเลิก' primary onClick={this.handleDialogClose} />,
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
          <Dialog title='เลือกรูปโปรไฟล์ของคุณ' actions={actions} modal={false} open={this.state.isDialogOpen} onRequestClose={this.handleDialogClose}>
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
            <RaisedButton label='เปลี่ยนรูปโปรไฟล์' onClick={this.handleDialogOpen} primary />
          </div>
          <form>
            <div style={styles.header}>ข้อมูลประวัติส่วนตัว</div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                name='email'
                floatingLabelText='อีเมลที่ใช้ลงทะเบียน'
                value={this.state.email}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                fullWidth
                disabled
                style={{ marginRight: 10 }}
                />
              <TextField
                name='id_card'
                floatingLabelText='รหัสบัตรประชาชน'
                value={this.state.id_card}
                errorText={this.state.id_card === undefined ? 'กรุณาติดต่อพยาบาลเพื่อกรอกข้อมูลนี้' : ''}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                fullWidth
                style={{ marginLeft: 10 }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <SelectField
                value={this.state.gender}
                floatingLabelText='เพศ'
                onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'gender')}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ width: 220, marginRight: 20 }}
                >
                {this.menuItems(gender)}
              </SelectField>
              <TextField
                name='firstname'
                type='text'
                floatingLabelText='ชื่อ'
                value={this.state.firstname}
                errorText={this.state.firstname === undefined ? 'กรุณากรอกข้อมูล' : ''}
                onChange={this._handleChangeValue}
                fullWidth
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ marginRight: 20 }}
                />

              <TextField
                name='lastname'
                type='text'
                floatingLabelText='นามสกุล'
                value={this.state.lastname}
                errorText={this.state.lastname === undefined ? 'กรุณากรอกข้อมูล' : ''}
                onChange={this._handleChangeValue}
                fullWidth
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <SelectField
                value={this.state.status}
                floatingLabelText='สถานะ'
                onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'status')}
                fullWidth
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ marginRight: 10 }}
                >
                {this.menuItems(_status)}
              </SelectField>

              <SelectField
                value={this.state.race}
                floatingLabelText='เชื้อชาติ'
                onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'race')}
                fullWidth
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ marginLeft: 10, marginRight: 10 }}
                >
                {this.menuItems(race)}
              </SelectField>

              <SelectField
                value={this.state.region}
                floatingLabelText='ศาสนา'
                onChange={(event, index, value) => this._handleSelectFieldChangeValue(event, index, value, 'region')}
                fullWidth
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ marginLeft: 10 }}
                >
                {this.menuItems(region)}
              </SelectField>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <DatePicker
                floatingLabelText='วันเกิด'
                container='inline'
                mode='landscape'
                defaultDate={date}
                maxDate={new Date()}
                autoOk
                openToYearSelection
                onChange={(foo, date) => this._handleDatePickerChangeValue(date, 'birthdate')}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ marginRight: 10 }}
                />
              <TextField
                name='career'
                type='text'
                defaultValue={this.state.career}
                errorText={this.state.career === undefined ? 'กรุณากรอกข้อมูล' : ''}
                floatingLabelText='อาชีพปัจจุบัน'
                onChange={this._handleChangeValue}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ width: 200, marginLeft: 10 }}
                />
            </div>
            <div style={styles.header}>ข้อมูลการติดต่อ</div>
            <TextField
              name='address'
              type='text'
              defaultValue={this.state.address}
              errorText={this.state.address === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='ที่อยู่ปัจจุบัน'
              rows={2}
              rowsMax={4}
              multiLine
              fullWidth
              onChange={this._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 20 }}
              />
            <TextField
              name='phone'
              type='text'
              defaultValue={this.state.phone}
              errorText={this.state.phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='เบอร์โทรศัพท์ผู้ป่วย'
              maxLength='10'
              onChange={this._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200 }}
              />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                name='cousin_name'
                type='text'
                defaultValue={this.state.cousin_name}
                errorText={this.state.cousin_name === undefined ? 'กรุณากรอกข้อมูล' : ''}
                floatingLabelText='ชื่อ-นามสกุล ญาติผู้ป่วย'
                onChange={this._handleChangeValue}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ width: 350, marginRight: 20 }}
                />
              <TextField
                name='cousin_phone'
                type='text'
                defaultValue={this.state.cousin_phone}
                errorText={this.state.cousin_phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
                floatingLabelText='เบอร์ติดต่อญาติผู้ป่วย'
                maxLength='10'
                onChange={this._handleChangeValue}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                style={{ width: 200, marginRight: 20 }}
                />
            </div>
            <div style={styles.button}>
              <RaisedButton label='อัพเดทข้อมูล' onClick={this._handleOpenConfirmDialog} primary style={{ width: 120 }} />
            </div>
            <br /><div style={styles.header}>ข้อมูลทางสุขภาพ</div>
            <div align='left' style={{ lineHeight: '2em' }}>
                น้ำหนัก: {'50'} กิโลกรัม <br />
                ส่วนสูง: {'160'} เซนติเมตร <br />
                ค่าดัชนีมวลกาย (BMI): {'19.53'} <br />
                หมู่เลือด: B<br />
                โรคประจำตัวผู้ป่วย: {'ชอบกินปลาเส้น'} <br />
                ยาที่ใช้ปัจจุบัน: {'ทาโร่'}<br />
                ยาที่แพ้: {'ฟิชโช่'}<br />
                อาหารที่แพ้: {'ปลาเส้น'}<br />
                ประวัติการสูบบุหรี่: {'ไม่มีประวัติการสูบบุหรี่'} <br />

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
