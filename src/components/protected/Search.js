import React, { Component } from 'react'
import { getPatientList } from '../../services/helpers'
import { Table } from 'react-bootstrap'

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
        // let patients = {}
        // for (let patient of res.data) {
        //   patients[Object.keys(patient)[0]] = patient[Object.keys(patient)[0]].information
        // }
        await that.setState({ patients: res.data })
      })
      .catch(res => that.setState(res))
  }

  renderTableInstance = () => (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th style={styles.centerText}>ลำดับที่</th>
          <th style={styles.centerText}>รหัสผู้ป่วย</th>
          <th style={styles.centerText}>เพศ</th>
          <th style={styles.centerText}>ชื่อ</th>
          <th style={styles.centerText}>นามสกุล</th>
          <th style={styles.centerText}>วันที่รับเข้าโรงพยาบาล</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
      </tbody>
    </Table>
  )

  render () {
    console.log(this.state.patients)
    return <div style={styles.container}>{this.renderTableInstance()}</div>
  }
}

const styles = {
  container: {
    paddingTop: 10,
    maxWidth: '80%',
    margin: 'auto'
  },
  centerText: {
    textAlign: 'center'
  }
}
