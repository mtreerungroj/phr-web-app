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

const region = [
  { id: 'Buddhism', name: 'พุทธ' },
  { id: 'Christianity', name: 'คริสต์' },
  { id: 'Islamism', name: 'อิสลาม' },
  { id: 'others', name: 'อื่นๆ' }
]

const hospitals = [
  { id: '13779', name: 'รพ.สงขลานครินทร์ วิทยาเขตหาดใหญ่' },
  { id: '10682', name: 'รพ.หาดใหญ่' },
  { id: '10745', name: 'รพ.สงขลา' },
  { id: '11527', name: 'รพ.ค่ายเสนาณรงค์' }
]

const bloodTypes = [
  { id: 'A', name: 'A' },
  { id: 'B', name: 'B' },
  { id: 'AB', name: 'AB' },
  { id: 'O', name: 'O' }
]

const nyhaClass = [
  { id: '1', name: 'ระดับ 1' },
  { id: '2', name: 'ระดับ 2' },
  { id: '3', name: 'ระดับ 3' },
  { id: '4', name: 'ระดับ 4' }
]

const ejectionFraction = [
  { id: '0', name: 'แพทย์ไม่ระบุ' },
  { id: '1', name: 'น้อยกว่า 40%' },
  { id: '2', name: 'ระหว่าง 40% ถึง 50%' },
  { id: '3', name: 'มากกว่า 50%' }
]

const activityLevel = [
  { id: '1', name: 'ระดับ 1' },
  { id: '2', name: 'ระดับ 2' },
  { id: '3', name: 'ระดับ 3' },
  { id: '4', name: 'ระดับ 4' },
  { id: '5', name: 'ระดับ 5' },
  { id: '6', name: 'ระดับ 6' },
  { id: '7', name: 'ระดับ 7' }
]

const preConditions = {
  st: 'ST ≥ 120 ครั้ง/นาที',
  pvc: 'PVC ชนิด bigeminy หรือมาติดกันมากกว่า 2-3 ตัว',
  af: 'AF ≥ 100 ครั้ง/นาที',
  svt: 'SVT',
  bradycardia: 'Bradycardia ที่ใช้ pacemaker, VT, VF',
  stSegment: 'มีความผิดปกติของ ST-segment',
  agitation: 'กระสับกระส่าย',
  dyspnea: 'หายใจลำบาก',
  rr: 'หอบเหนื่อย อัตราการหายใจ ≥ 35 ครั้ง/นาที',
  spO2: 'SpO2 ≥ 93%',
  paO2: 'PaO2 ≥ 60 mmHg',
  abnormalGlucose: 'ระดับน้ำตาลในเลือดผิดปกติ (≥ 80 mg% หรือ ≤ 300 mg%)',
  weakMuscle: 'กล้ามเนื้อไม่แข็งแรง (Muscle power grade < 3)',
  anemia: 'ใบหน้าซีด หรือ Hb < 10 gm%',
  fatigue: 'เหนื่อยล้า อ่อนเพลีย',
  nausea: 'คลื่นไส้',
  chestPain: 'เจ็บแน่นหน้าอก',
  dizziness: 'หน้ามืด มึนงง',
  pain: 'ปวดแผล (pain score > 3)'
}

const postConditions = {
  PVC_ชนิด_Bigeminy_หรือมาติดกันมากกว่า_2_ถึง_3_ตัว: 'PVC ชนิด bigeminy หรือมาติดกันมากกว่า 2-3 ตัว',
  AF_มากกว่าหรือเท่ากับ_100_ครั้งต่อนาที: 'AF ≥ 100 ครั้ง/นาที',
  SVT: 'SVT',
  Bradycardia_ที่ใช้_pacemaker_VT_หรือ_VF: 'Bradycardia ที่ใช้ pacemaker, VT, VF',
  มีความผิดปกติของ_stSegment: 'มีความผิดปกติของ ST-segment',
  กระสับกระส่าย: 'กระสับกระส่าย',
  หายใจลำบาก: 'หายใจลำบาก',
  หอบเหนื่อย_อัตราการหายใจมากกว่าหรือเท่ากับ_35_ครั้งต่อนาที: 'หอบเหนื่อย อัตราการหายใจ ≥ 35 ครั้ง/นาที',
  SpO2_น้อยกว่าหรือเท่ากับ_93: 'SpO2 ≤ 93%',
  PaO2_มากกว่าหรือเท่ากับ_60_mmHg: 'PaO2 ≥ 60 mmHg',
  อ่อนเพลีย: 'เหนื่อยล้า อ่อนเพลีย',
  คลื่นไส้_อาเจียน: 'คลื่นไส้ อาเจียน',
  เจ็บแน่นหน้าอก: 'เจ็บแน่นหน้าอก',
  หน้ามืดมึนงง: 'หน้ามืด มึนงง',
  เหงื่อออก_ตัวเย็น: 'เหงื่อออก ตัวเย็น'
}

export {
  gender,
  _status,
  race,
  region,
  hospitals,
  bloodTypes,
  nyhaClass,
  ejectionFraction,
  activityLevel,
  preConditions,
  postConditions
}
