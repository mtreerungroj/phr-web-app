import React, { Component } from 'react'

export default class Step1Patient extends Component {
  render () {
    return (
      <div style={styles.container}>
        step 1 patient
      </div>
    )
  }
}

const styles = {
  container: {
    width: '60%',
    height: '90%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: 10
  }
}
