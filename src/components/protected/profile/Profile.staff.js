import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { grey500, grey600 } from 'material-ui/styles/colors'
import { hospitals } from '../../../services/enum'
import { uploadFileToStorage } from '../../../services/helpers'

export default class StaffProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDialogOpen: false,
      file: null,
      isShowPincode: false,
      isShowSnackbar: false,
      SnackbarMessage: ''
    }
  }

  handleDialogOpen = () => this.setState({ isDialogOpen: true })

  handleDialogClose = () => this.setState({ isDialogOpen: false, file: null })

  handleDialogCloseWithSubmit = () => {
    if (this.state.file != null) {
      if (this.props.role === 'nurse' || this.props.role === 'doctor') {
        uploadFileToStorage(this.props.userid, this.state.file)
          .then(res => {
            this.setState(res)
            this.props.updateUserStatus()
          })
          .catch(res => this.setState(res))
      }
    } else {
      this.setState({ isDialogOpen: false, isShowSnackbar: true, SnackbarMessage: 'เกิดข้อผิดพลาด กรุณาเลือกรูปภาพก่อน' })
    }
  }

  handleSnackbarClose = () => this.setState({ isShowSnackbar: false, SnackbarMessage: '' })

  handleToggleShowPincode = () => this.setState({ isShowPincode: !this.state.isShowPincode })

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

    return (
      <div style={styles.container}>
        <Dialog title='เลือกรูปโปรไฟล์ของคุณ' actions={actions} modal={false} open={this.state.isDialogOpen} onRequestClose={this.handleClose}>
          <input type='file' onChange={this.handleUploadFile} />
        </Dialog>
        <Snackbar open={this.state.isShowSnackbar} message={this.state.SnackbarMessage} autoHideDuration={3000} onRequestClose={this.handleSnackbarClose} />
        <div style={styles.inner}>
          <img
            src={this.props.picture_uri !== undefined ? this.props.picture_uri : require('../../../assets/images/default-profile-picture.png')}
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
              value={this.props.email}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              disabled
              style={{ marginRight: 10 }}
            />
            <div style={{ marginLeft: 10, marginRight: 10, width: 300 }}>
              <TextField
                name='pin_code'
                floatingLabelText='PIN code'
                value={this.state.isShowPincode ? this.props.pin_code : '********'}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                fullWidth
                disabled
              />
            </div>
            <div style={{ marginLeft: 10, width: 100, margin: 'auto' }}>
              <RaisedButton label={this.state.isShowPincode ? 'ซ่อน' : 'แสดง'} onClick={this.handleToggleShowPincode} primary />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SelectField
              value={this.props.hospitalid}
              floatingLabelText='โรงพยาบาล'
              onChange={(event, index, value) => this.props._handleSelectFieldChangeValue(event, index, value, 'hospitalid')}
              maxHeight={200}
              style={{ width: 300 }}
            >
              {this.props.menuItems(hospitals)}
            </SelectField>
            <TextField
              name='personalid'
              floatingLabelText='รหัสประจำตัว (4 หลัก)'
              value={this.props.personalid}
              errorText={this.props.firstname === undefined ? 'กรุณากรอกข้อมูล' : ''}
              onChange={this.props._handleChangeValue}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
              style={{ marginRight: 10, maxWidth: 300 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              name='firstname'
              type='text'
              floatingLabelText='ชื่อ'
              value={this.props.firstname}
              errorText={this.props.firstname === undefined ? 'กรุณากรอกข้อมูล' : ''}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginRight: 10, maxWidth: 300 }}
            />

            <TextField
              name='lastname'
              type='text'
              floatingLabelText='นามสกุล'
              value={this.props.lastname}
              errorText={this.props.lastname === undefined ? 'กรุณากรอกข้อมูล' : ''}
              onChange={this.props._handleChangeValue}
              fullWidth
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              style={{ marginLeft: 10, maxWidth: 300 }}
            />
          </div>
          <TextField
            name='phone'
            type='text'
            defaultValue={this.props.phone}
            errorText={this.props.phone === undefined ? 'กรุณากรอกข้อมูล' : ''}
            floatingLabelText='เบอร์โทรศัพท์ (10 หลัก)'
            maxLength='10'
            onChange={this.props._handleChangeValue}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            style={{ width: 200 }}
          />
          <div style={styles.button}>
            <RaisedButton label='อัพเดทข้อมูล' onClick={this.props._handleOpenConfirmDialog} primary style={{ width: 120 }} />
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
  }
}
