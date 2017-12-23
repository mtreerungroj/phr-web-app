import React, { Component } from 'react'
import { Card, CardActions } from 'material-ui/Card'
import { grey200, grey600, cyan500 } from 'material-ui/styles/colors'

export default class Step2Staff extends Component {
  render () {
    console.log(this.props)
    return (
      <Card style={styles.container}>
        <div style={styles.topContent}>
          อีเมล: <span style={styles.boldText}>{this.props.email}</span>
          <br />
          รหัส PIN: <span style={styles.boldText}>(get from server)</span>
          <br />
          <div style={styles.notation}>
            หมายเหตุ: โปรดจดจำรหัส PIN นี้ เนื่องจากระบบจะใช้รหัส PIN สำหรับยืนยันตัวตนของคุณ
          </div>
        </div>

        <div style={styles.header}>
          กรอกข้อมูลประวัติส่วนตัวเพื่อสิ้นสุดการลงทะเบียน
        </div>

        <div style={{}}>
          form is here<br />
          form is here<br />
          form is here<br />
          form is here<br />
        </div>
      </Card>
    )
  }
}

const styles = {
  container: {
    width: '60%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: 10
  },
  topContent: {
    padding: 10,
    marginBottom: 5,
    borderStyle: 'ridge',
    borderRadius: 10,
    borderColor: cyan500,
    backgroundColor: grey200
  },
  header: {
    textAlign: 'center'
  },
  notation: {
    fontSize: 12,
    color: grey600
  },
  boldText: {
    fontWeight: 'bold'
  }
}
