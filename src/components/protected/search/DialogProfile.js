import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'

export default class DialogProfile extends Component {
  render () {
    const actions = [
      <FlatButton label='ยกเลิก' primary onClick={this.props.handleDialogUploadFileClose} />,
      <FlatButton label='บันทึก' primary keyboardFocused onClick={this.props.handleDialogCloseWithSubmit} />
    ]
    const confirmActions = [
      <FlatButton label='ยกเลิก' primary onClick={this.props._handleCloseConfirmDialog} />,
      <FlatButton label='ยืนยัน' primary keyboardFocused onClick={this.props._handleCloseConfirmDialogWithSubmit} />
    ]
    const validateActions = [<FlatButton label='ตกลง' primary onClick={this.props._handleCloseValidateDialog} />]

    return (
      <div>
        <Dialog
          title='เลือกรูปโปรไฟล์ของคุณ'
          actions={actions}
          modal={false}
          open={this.props.isUploadFileDialogOpen}
          onRequestClose={this.props.handleUploadFileDialogClose}
        >
          <input type='file' onChange={this.props.handleUploadFile} />
        </Dialog>
        <Dialog
          title='ยืนยันการบันทึกข้อมูล'
          actions={confirmActions}
          modal={false}
          open={this.props.isConfirmDialogOpen}
          onRequestClose={this.props._handleCloseConfirmDialog}
        >
          {this.props.confirmDialogMessage}
        </Dialog>
        <Dialog
          title='เกิดข้อผิดพลาด'
          actions={validateActions}
          modal={false}
          open={this.props.isValidateDialogOpen}
          onRequestClose={this.props._handleCloseConfirmDialog}
        >
          {this.props.ValidateDialogMessage}
        </Dialog>
        <Snackbar
          open={this.props.isShowSnackbar}
          message={this.props.SnackbarMessage}
          autoHideDuration={3000}
          onRequestClose={this.props.handleSnackbarClose}
        />
      </div>
    )
  }
}
