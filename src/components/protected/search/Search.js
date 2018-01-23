import React, { Component } from 'react'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import SearchInput, { createFilter } from 'react-search-input'
import RaisedButton from 'material-ui/RaisedButton'

import { grey300 } from 'material-ui/styles/colors'
import { getUserStatus, getPatientList } from '../../../services/helpers'
import PatientInformation from './PatientInformation'

const KEYS_TO_FILTERS = ['patient_code', 'firstname', 'lastname']

const convertDateFormat = inputDate => {
  let date = new Date(inputDate)
  if (!isNaN(date.getTime())) {
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
  }
}

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      patients: [],
      searchTerm: '',
      isSelectPatient: false,
      selectedPatient: ''
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
          let data = await patient[Object.keys(patient)[0]].patient_code
          await patients.push({
            patient_code: data.patient_code,
            gender: data.gender === 'women' ? 'หญิง' : 'ชาย',
            firstname: data.firstname,
            lastname: data.lastname,
            admit_date: convertDateFormat(data.admit_date),
            userid: data.userid
          })
        }

        await that.setState({ patients })
      })
      .catch(res => that.setState(res))

    await getUserStatus().then(res => this.setState(res)).catch(res => this.setState(res))
  }

  searchUpdated = term => this.setState({ searchTerm: term })

  handleClickButton = userid => this.setState({ isSelectPatient: true, selectedPatient: userid })

  searchTableColumns = [
    {
      Header: 'รหัสผู้ป่วย',
      accessor: 'patient_code',
      Cell: props => <div style={styles.cellWithCenter}>{props.value}</div>
    },
    {
      Header: 'เพศ',
      accessor: 'gender',
      Cell: props => <div style={styles.cellWithCenter}>{props.value}</div>
    },
    {
      Header: 'ชื่อ',
      accessor: 'firstname',
      Cell: props => <div style={styles.cell}>{props.value}</div>
    },
    {
      Header: 'นามสกุล',
      accessor: 'lastname',
      Cell: props => <div style={styles.cell}>{props.value}</div>
    },
    {
      Header: 'วันที่รับเข้าโรงพยาบาล',
      accessor: 'admit_date',
      Cell: props => <div style={styles.cellWithCenter}>{props.value}</div>
    },
    {
      Header: 'ดูข้อมูลผู้ป่วย',
      accessor: 'userid',
      Cell: props => <div style={{ textAlign: 'center' }}><RaisedButton label='เลือก' primary onClick={() => this.handleClickButton(props.value)} /></div>
    }
  ]

  renderContent = () => {
    const filteredPatients = this.state.patients.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return this.state.isSelectPatient
      ? <PatientInformation isSelectPatient={this.state.isSelectPatient} userid={this.state.selectedPatient} />
      : <div style={styles.container}>
        <div style={styles.tableContainer}>
          <div style={styles.headerContainer}>
            <div style={styles.header}>ค้นหาผู้ป่วยทั้งหมด</div>
            <SearchInput className='search-input' placeholder={'🔎 ค้นหาผู้ป่วย...'} onChange={this.searchUpdated} />
          </div>
          <ReactTable data={filteredPatients} columns={this.searchTableColumns} defaultPageSize={10} pageSizeOptions={[10, 20, 50, 100]} />
        </div>
      </div>
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : this.state.profile.role === 'nurse' || this.state.profile.role === 'doctor' ? this.renderContent() : <div>Inaccessible</div>
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  centerText: {
    textAlign: 'center'
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  },
  cell: {
    marginTop: '8px'
  },
  cellWithCenter: {
    textAlign: 'center',
    marginTop: '8px'
  }
}
