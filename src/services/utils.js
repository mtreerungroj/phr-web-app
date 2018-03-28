import { appid } from './helpers'

const convertDateFormat = inputDate => {
  let date = new Date(inputDate)
  if (!isNaN(date.getTime())) {
    return date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear()
  }
}

const recordActivity = async state => {
  let DbpIncreaseAtLeast20mmHg = false
  let SbpDecreaseMoreThan20mmHg = false
  let SbpIncreaseMoreThan40mmHg = false

  if (state.preBp && state.postBp) {
    let diffDBp = state.postBp.split('/')[1] - state.preBp.split('/')[1]
    diffDBp >= 20 && (DbpIncreaseAtLeast20mmHg = true)

    let diffSBp = state.postBp.split('/')[0] - state.preBp.split('/')[0]
    diffSBp < -20 && (SbpDecreaseMoreThan20mmHg = true)
    diffSBp > 40 && (SbpIncreaseMoreThan40mmHg = true)
  }

  let timeStart = null
  let timeStop = null

  if (state.real_date && state.real_time) {
    let fullTimeStart = new Date(
      state.real_date + 'T' + state.real_time + '-00:00'
    )
    timeStart = fullTimeStart.toISOString()

    if (state.durationMinutes) {
      let fullTimeStop = new Date(
        fullTimeStart.getTime() + state.durationMinutes * 60000
      )
      timeStop = fullTimeStop.toISOString()
    }
  }

  let data = await {
    userid: state.patientid,
    appid,
    date: state.real_date,
    time: state.real_time,
    result: {
      date: state.real_date,
      durationMillis: state.durationMinutes * 60000 || 0,
      durationMinutes: state.durationMinutes || 0,
      postActivity: {
        DbpIncreaseAtLeast20mmHg: DbpIncreaseAtLeast20mmHg,
        HRReachTargetHR: state.preHr > state.preHr + 20,
        SbpDecreaseMoreThan20mmHg: SbpDecreaseMoreThan20mmHg,
        SbpIncreaseMoreThan40mmHg: SbpIncreaseMoreThan40mmHg,
        assistant: state.assistant || 0,
        borg: state.borg || null,
        cardiacDisorder: state.cardiacDisorder || null,
        note: state.note || null,
        otherDisorder: state.otherDisorder || null,
        postBp: state.postBp || '',
        postHr: state.postHr || '',
        recorder: state.userid,
        respiratoryDisorder: state.respiratoryDisorder || null
      },
      preActivity: {
        abnormalGlucose: state.abnormalGlucose || false,
        af: state.af || false,
        agitation: state.agitation || false,
        anemia: state.anemia || false,
        bradycardia: state.bradycardia || false,
        chestPain: state.chestPain || false,
        dizziness: state.dizziness || false,
        dyspnea: state.dyspnea || false,
        fatigue: state.fatigue || false,
        highDbp: state.highDbp || false,
        highSbp: state.highSbp || false,
        nausea: state.nausea || false,
        paO2: state.paO2 || false,
        pain: state.pain || false,
        passed: true,
        preBp: state.preBp || '',
        preHr: state.preHr || '',
        pvc: state.pvc || false,
        rr: state.rr || false,
        sbpLowerThanNormal: state.sbpLowerThanNormal || false,
        spO2: state.spO2 || false,
        st: state.st || false,
        stSegment: state.stSegment || false,
        svt: state.svt || false,
        weakMuscle: state.weakMuscle || false
      },
      result: {
        completedLevel: state.completedLevel || false,
        maxLevel: state.maxLevel || 1,
        nextLevel: state.completedLevel
          ? (state.maxLevel || 1) + 1
          : state.maxLevel || 1
      },
      time: state.real_time,
      timeStart: timeStart,
      timeStop: timeStop,
      timestamp: Date.now()
    }
  }

  return data
}

export { convertDateFormat, recordActivity }
