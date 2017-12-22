import React, { Component } from 'react'
import Page404 from '../Page404'
import Step0Register from './Step0.register'
import Step1Staff from './Step1.staff'
import Step1Patient from './Step1.patient'

export default class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      level: 0,
      isStaff: false
    }
  }

  handleChangeLevel = (level, isStaff = false) => {
    this.setState({ level, isStaff })
  }

  _handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderElement = () => {
    if (this.state.level === 0) return <Step0Register handleChangeLevel={this.handleChangeLevel} />
    else if (this.state.isStaff) return <Step1Staff />
    else {
      switch (this.state.level) {
        case 1:
          return <Step1Patient />
        default:
          return <Page404 />
      }
    }
  }

  render () {
    return (
      <div style={styles.container}>
        <div />
        {this.renderElement()}
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
  }
}
