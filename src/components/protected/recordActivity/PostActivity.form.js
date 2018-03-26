import React, { Component } from 'react'

import { grey500 } from 'material-ui/styles/colors'

export default class PostActivityForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: false })
  }

  render () {
    return this.state.isLoading
      ? <div>กำลังโหลดข้อมูล...</div>
      : <div style={styles.container}>
        <div><b>ข้อมูลผลการทำกิจกรรม</b></div>

      </div>
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30
  },
  rowDirection: {
    display: 'flex',
    flexDirection: 'row'
  },
  underlineStyle: {
    borderColor: grey500
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  }
}
