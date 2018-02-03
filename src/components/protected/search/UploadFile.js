import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class UploadFile extends Component {
  render () {
    return (
      <div style={this.props.styles.inner}>
        <RaisedButton label='< ย้อนกลับ' onClick={this.props.handleBackButton} style={{ marginBottom: 20 }} fullWidth />
        <img
          src={this.props.picture_uri !== undefined ? this.props.picture_uri : require('../../../assets/images/default-profile-picture.png')}
          alt=''
          style={{ maxWidth: '200px', width: '100%', height: 'auto', marginBottom: 10 }}
        />
        <br />
        <RaisedButton label='เปลี่ยนรูปโปรไฟล์' onClick={this.props.handleDialogUploadFileOpen} primary />
      </div>
    )
  }
}
