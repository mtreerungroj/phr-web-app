import React, { Component } from 'react'
import { getPatientList } from '../../services/helpers'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patients: []
    }
  }

  async componentDidMount () {
    const that = this
    await getPatientList()
      .then(async res => {
        let patients = {}
        for (let patient of res.data) {
          patients[Object.keys(patient)[0]] = patient[Object.keys(patient)[0]].information
        }
        await that.setState({ patients })
      })
      .catch(res => that.setState(res))
  }

  render () {
    console.log(this.state.patients)
    return <div>Search page</div>
  }
}
