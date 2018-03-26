import React, { Component } from 'react'
import InformationForm from './Information.form'
import PreActivityForm from './PreActivity.from'
import PostActivityForm from './PostActivity.form'
import ResultActivityForm from './Result.form'

import { getUserStatus } from '../../../services/helpers'

import { grey300 } from 'material-ui/styles/colors'

export default class RecordActivity extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    await getUserStatus()
      .then(res => this.setState(res))
      .catch(res => this.setState(res))
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role !== 'nurse' &&
          this.state.profile.role !== 'doctor'
          ? <div>Inaccessible</div>
          : <div style={styles.container}>
            <div style={styles.inner}>
              <div style={styles.header}>
                  บันทึกผลการทำกิจกรรมฟื้นฟูสมรรถภาพห้วใจของผู้ป่วยย้อนหลัง
                </div>
            </div>
            <div style={styles.content}>
              <InformationForm />
              <PreActivityForm />
              <PostActivityForm />
              <ResultActivityForm />
            </div>
          </div>
  }
}

const styles = {
  container: {
    backgroundColor: grey300,
    display: 'flex',
    flexDirection: 'column'
  },
  inner: {
    flex: 1
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  content: {
    marginLeft: 30,
    marginRight: 30
  }
}
