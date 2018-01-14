import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const gender = [{ id: 'men', name: 'ชาย' }, { id: 'women', name: 'หญิง' }]

const _status = [
  { id: 'single', name: 'โสด' },
  { id: 'engaged', name: 'หมั้น' },
  { id: 'married', name: 'แต่งงานแล้ว' },
  { id: 'separated', name: 'แยกกันอยู่' },
  { id: 'divorced', name: 'หย่า' },
  { id: 'widowed', name: 'หม้าย' }
]

const race = [{ id: 'Thai', name: 'ไทย' }, { id: 'others', name: 'อื่นๆ' }]

const region = [{ id: 'Buddhism', name: 'พุทธ' }, { id: 'Christianity', name: 'คริสต์' }, { id: 'Islamism', name: 'อิสลาม' }, { id: 'others', name: 'อื่นๆ' }]

const hospitals = [
  { id: '13779', name: 'รพ.สงขลานครินทร์ วิทยาเขตหาดใหญ่' },
  { id: '10682', name: 'รพ.หาดใหญ่' },
  { id: '10745', name: 'รพ.สงขลา' },
  { id: '11527', name: 'รพ.ค่ายเสนาณรงค์' }
]

const searchTableColumns = [
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
  },
  {
    Header: 'ดูประวัติผู้ป่วย',
    accessor: 'patient_code',
    Cell: props => <div style={{ textAlign: 'center' }}><RaisedButton label={props.value} primary /></div>
  }
]

export { gender, _status, race, region, hospitals, searchTableColumns }
