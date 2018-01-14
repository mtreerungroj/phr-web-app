import React, { Component } from 'react'
import { getPatientList } from '../../services/helpers'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { grey300 } from 'material-ui/styles/colors'

const columns = [
  {
    Header: 'รหัสผู้ป่วย',
    accessor: 'patient_code'
  },
  {
    Header: 'เพศ',
    accessor: 'gender'
  },
  {
    Header: 'ชื่อ',
    accessor: 'firstname'
  },
  {
    Header: 'นามสกุล',
    accessor: 'lastname'
  },
  {
    Header: 'วันที่รับเข้าโรงพยาบาล',
    accessor: 'admit_date'
  }
]

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      patients: []
    }
  }

  async componentDidMount () {
    const that = this
    await getPatientList()
      .then(async res => {
        // get data as object
        // let patients = {}
        // for (let patient of res.data) {
        //   patients[Object.keys(patient)[0]] = patient[Object.keys(patient)[0]].information
        // }

        // get data as array
        let patients = []
        for (let patient of res.data) {
          let data = await patient[Object.keys(patient)[0]].information
          await patients.push({
            patient_code: data.patient_code,
            gender: data.gender === 'women' ? 'หญิง' : 'ชาย',
            firstname: data.firstname,
            lastname: data.lastname,
            admit_date: data.admit_date
          })
        }

        await that.setState({ patients, isLoading: false })
      })
      .catch(res => that.setState(res))
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div style={styles.container}>
        <div style={styles.tableContainer}>
          <div style={styles.header}>ค้นหาผู้ป่วยทั้งหมด</div>
          <ReactTable data={this.state.patients} columns={columns} defaultPageSize={10} pageSizeOptions={[10, 20, 50, 100]} />
        </div>
      </div>
  }
}

const styles = {
  container: {
    backgroundColor: grey300
  },
  tableContainer: {
    paddingTop: 20,
    paddingBottom: 40,
    maxWidth: '80%',
    margin: 'auto'
  },
  centerText: {
    textAlign: 'center'
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  }
}
