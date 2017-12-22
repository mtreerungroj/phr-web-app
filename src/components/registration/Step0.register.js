import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class Step0Register extends Component {
  render () {
    return (
      <div style={styles.container}>
        <div style={styles.inner}>
          ลงทะเบียนสำหรับ
        </div>
        <div style={styles.inner}>
          <RaisedButton primary label='แพทย์และพยาบาล' onClick={() => this.props.handleChangeLevel(1, true)} style={styles.button} />
          หรือ
          <RaisedButton primary label='ผู้ป่วย' onClick={() => this.props.handleChangeLevel(1)} style={styles.button} />
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    margin: 20
  },
  button: {
    margin: 12
  }
}
