import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

export default class Step0Register extends Component {
  render () {
    return (
      <Card style={styles.container}>

        <div style={styles.inner}>
          ลงทะเบียนสำหรับ
        </div>
        <div style={styles.inner}>
          <RaisedButton primary label='แพทย์และพยาบาล' onClick={() => this.props.handleChangeLevel(1, true)} style={styles.button} />
          หรือ
          <RaisedButton primary label='ผู้ป่วย' onClick={() => this.props.handleChangeLevel(1)} style={styles.button} />
        </div>
      </Card>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
    margin: 'auto'
  },
  inner: {
    margin: 20,
    textAlign: 'center'
  },
  button: {
    margin: 12
  }
}
