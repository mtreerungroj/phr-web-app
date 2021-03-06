import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import Snackbar from 'material-ui/Snackbar'
import { grey500, grey600 } from 'material-ui/styles/colors'
import { gender, _status, race, region } from '../../../services/enum'
import { uploadFileToStorage } from '../../../services/helpers'
import { convertDateFormat } from '../../../services/utils'

export default class PatientProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDialogOpen: false,
      file: null,
      isShowSnackbar: false,
      SnackbarMessage: ''
    }
  }

  handleDialogOpen = () => this.setState({ isDialogOpen: true })

  handleDialogClose = () => this.setState({ isDialogOpen: false, file: null })

  handleDialogCloseWithSubmit = () => {
    if (this.state.file != null) {
      if (this.props.role === 'patient') {
        uploadFileToStorage(this.props.userid, this.state.file)
          .then(res => {
            this.setState(res)
            this.props.updateUserStatus()
          })
          .catch(res => this.setState(res))
      } else {
        this.setState({ isDialogOpen: false, isShowSnackbar: true, SnackbarMessage: 'เกิดข้อผิดพลาด กรุณาเลือกรูปภาพก่อน' })
      }
    }
  }

  handleSnackbarClose = () => this.setState({ isShowSnackbar: false, SnackbarMessage: '' })

  handleUploadFile = e => this.setState({ file: e.target.files[0] })

  render () {
    let date = new Date()
    if (this.props.birthdate) {
      date = new Date(this.props.birthdate)
      date.setDate(date.getDate() + 1)
    } else this.props._handleDatePickerChangeValue(date, 'birthdate')

    const actions = [
      <FlatButton label='ยกเลิก' primary onClick={this.handleDialogClose} />,
      <FlatButton label='บันทึก' primary keyboardFocused onClick={this.handleDialogCloseWithSubmit} />
    ]

    const profile = this.props
    return (
      <div style={styles.container}>
        <Dialog title='เลือกรูปโปรไฟล์ของคุณ' actions={actions} modal={false} open={this.state.isDialogOpen} onRequestClose={this.handleDialogClose}>
          <input type='file' onChange={this.handleUploadFile} />
        </Dialog>
        <Snackbar open={this.state.isShowSnackbar} message={this.state.SnackbarMessage} autoHideDuration={3000} onRequestClose={this.handleSnackbarClose} />
        <div style={styles.inner}>
          <img
            src={profile.picture_uri !== undefined ? profile.picture_uri : require('../../../assets/images/default-profile-picture.png')}
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
              value={profile.email}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginRight: 10 }}
            />
            <TextField
              name='id_card'
              floatingLabelText='รหัสบัตรประชาชน'
              value={profile.id_card}
              errorText={profile.id_card === undefined ? 'กรุณาติดต่อพยาบาลเพื่อกรอกข้อมูลนี้' : ''}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginLeft: 10 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={profile.gender}
              floatingLabelText='เพศ'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'gender')}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 220, marginRight: 20 }}
            >
              {this.props.menuItems(gender)}
            </SelectField>
            <TextField
              name='firstname'
              type='text'
              floatingLabelText='ชื่อ'
              value={profile.firstname}
              errorText={profile.firstname === undefined ? 'กรุณากรอกข้อมูล' : ''}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 20 }}
            />

            <TextField
              name='lastname'
              type='text'
              floatingLabelText='นามสกุล'
              value={profile.lastname}
              errorText={profile.lastname === undefined ? 'กรุณากรอกข้อมูล' : ''}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={profile.status}
              floatingLabelText='สถานะ'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'status')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 10 }}
            >
              {this.props.menuItems(_status)}
            </SelectField>

            <SelectField
              value={profile.race}
              floatingLabelText='เชื้อชาติ'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'race')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              {this.props.menuItems(race)}
            </SelectField>

            <SelectField
              value={profile.region}
              floatingLabelText='ศาสนา'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'region')}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginLeft: 10 }}
            >
              {this.props.menuItems(region)}
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
              onChange={(foo, date) => this.props._handleDatePickerChangeValue(date, 'birthdate')}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 10 }}
            />
            <TextField
              name='career'
              type='text'
              defaultValue={profile.career}
              errorText={profile.career === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='อาชีพปัจจุบัน'
              onChange={this.props._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200, marginLeft: 10 }}
            />
          </div>
          <div style={styles.header}>ข้อมูลการติดต่อ</div>
          <TextField
            name='address'
            type='text'
            defaultValue={profile.address}
            errorText={profile.address === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='ที่อยู่ปัจจุบัน'
            rows={2}
            rowsMax={4}
            multiLine
            fullWidth
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ marginRight: 20 }}
          />
          <TextField
            name='phone'
            type='text'
            defaultValue={profile.phone}
            errorText={profile.phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='เบอร์โทรศัพท์ผู้ป่วย'
            maxLength='10'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 200 }}
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='cousin_name'
              type='text'
              defaultValue={profile.cousin_name}
              errorText={profile.cousin_name === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='ชื่อ-นามสกุล ญาติผู้ป่วย'
              onChange={this.props._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 350, marginRight: 20 }}
            />
            <TextField
              name='cousin_phone'
              type='text'
              defaultValue={profile.cousin_phone}
              errorText={profile.cousin_phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
              floatingLabelText='เบอร์ติดต่อญาติผู้ป่วย'
              maxLength='10'
              onChange={this.props._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ width: 200, marginRight: 20 }}
            />
          </div>
          <div style={styles.button}>
            <RaisedButton label='อัพเดทข้อมูล' onClick={this.props._handleOpenConfirmDialog} primary style={{ width: 120 }} />
          </div>
          <br /><div style={styles.header}>ข้อมูลทางสุขภาพ</div>
          <div align='left' style={{ lineHeight: '2em' }}>
            <div style={styles.profileElement}>
              {'วันที่รับผู้ป่วยเข้าโรงพยาบาล: ' + convertDateFormat(profile.admit_date)} <br />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={styles.profileElement}>
                {'น้ำหนัก: ' + (profile.weight ? profile.weight + ' กิโลกรัม' : 'ยังไม่ได้กรอกข้อมูล')} <br />
              </div>
              <div style={styles.profileElement}>
                {'ส่วนสูง: ' + (profile.height ? profile.height + ' เซนติเมตร' : 'ยังไม่ได้กรอกข้อมูล')} <br />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={styles.profileElement}>
                {'หมู่เลือด: ' + (profile.blood_type ? profile.blood_type : 'ยังไม่ได้กรอกข้อมูล')} <br />
              </div>
              <div style={styles.profileElement}>
                {'ค่าดัชนีมวลกาย: ' + (profile.bmi ? profile.bmi : '-')} <br />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={styles.profileElement}>
                {'โรคประจำตัว: ' + (profile.medical_condition ? profile.medical_condition : '-')} <br />
              </div>
              <div style={styles.profileElement}>
                {'ยาที่ใช้ปัจจุบัน: ' + (profile.current_medicine ? profile.current_medicine : '-')} <br />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={styles.profileElement}>
                {'ยาที่แพ้: ' + (profile.allergic_food ? profile.allergic_food : '-')} <br />
              </div>
              <div style={styles.profileElement}>
                {'อาหารที่แพ้: ' + (profile.bmi ? profile.bmi : '-')} <br />
              </div>
            </div>
            <div style={styles.profileElement}>
              {'ประวัติการสูบบุหรี่: ' + (profile.is_smoking ? 'มี' : 'ไม่มี')} <br />
            </div>
            <div style={styles.profileElement}>
              {'ประวัติการเป็นโรคทางปอด: ' + (profile.is_lung_disease ? 'มี' : 'ไม่มี')} <br />
            </div>
            <div style={styles.profileElement}>
              {'จำนวนของเส้นเลือดจากขาที่นำมาทำทางเบี่ยง (Sapheneous vein): ' +
                (profile.surgery_sapheneous_vein ? profile.surgery_sapheneous_vein + ' เส้น' : 'ไม่ได้ระบุ')}
              <br />
            </div>
            <div style={styles.profileElement}>
              {'ระดับความรุนแรงของหัวใจตามเกณฑ์สมาคมโรคหัวใจนิวยอร์ก (NYHA 1-4) : ' + (profile.nyha_class ? profile.nyha_class : 'ไม่ระบุ')} <br />
            </div>
            <div style={styles.profileElement}>
              {'ประสิทธิภาพการบีบตัวของกล้ามเนื้อหัวใจ: ' +
                (profile.ejection_fraction
                  ? profile.ejection_fraction === 1 ? 'น้อยกว่า 40%' : profile.ejection_fraction === 2 ? 'ระหว่าง 40% - 50%' : 'มากกว่า 50%'
                  : 'ไม่ระบุ')}
              <br />
            </div>

            {/* <br /><div style={styles.header}>ข้อมูลเกี่ยวกับการรักษา/ผ่าตัด</div> <br />
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
            จำนวนของเส้นเลือดทั้งหมดที่ทำทางเบี่ยง: {'3'} เส้น ได้แก่ {'1 Sapheneous vein, 1 Radial artery, 1 Internal mammary artery'}<br /> */}
          </div>
        </form>
      </div>
    )
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
  },
  profileElement: {
    marginRight: 20,
    flex: 1
  }
}
