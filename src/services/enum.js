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

const bloodTypes = [{ id: 'A', name: 'A' }, { id: 'B', name: 'B' }, { id: 'AB', name: 'AB' }, { id: 'O', name: 'O' }]

const nyhaClass = [{ id: '1', name: 'ระดับ 1' }, { id: '2', name: 'ระดับ 2' }, { id: '3', name: 'ระดับ 3' }, { id: '4', name: 'ระดับ 4' }]

const ejectionFraction = [
  { id: '0', name: 'แพทย์ไม่ระบุ' },
  { id: '1', name: 'น้อยกว่า 40%' },
  { id: '2', name: 'ระหว่าง 40% ถึง 50%' },
  { id: '3', name: 'มากกว่า 50%' }
]

export { gender, _status, race, region, hospitals, bloodTypes, nyhaClass, ejectionFraction }
