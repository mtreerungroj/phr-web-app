import 'firebase/auth'
import firebase from './firebase'

const server_ip = 'http://192.168.1.53:5000/'
const appid = 'hphrapp'

const getUserStatus = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userid = user.uid
        const path = server_ip + 'profile/info?appid=' + appid + '&userid=' + userid

        fetch(path).then(res => res.json()).then(res => {
          let profile = {}
          if (res.data) profile = res.data.profile
          resolve({ authed: true, isLoading: false, userid, profile })
        })
      } else reject({ authed: false, isLoading: false })
    })
  })
}

const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const uid = firebase.auth().currentUser.uid
        const path = server_ip + 'profile/info?appid=' + appid + '&userid=' + uid

        fetch(path).then(res => res.json()).then(res => {
          const profile = res.data.profile
          resolve({ authed: true, isLoading: false, uid, profile })
        })
      })
      .catch(error => {
        reject({ isDialogOpen: true, dialogMessage: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง', isLoading: false })
      })
  })
}

const signOut = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve({ authed: false, isDialogOpen: true, dialogMessage: 'ออกจากระบบสำเร็จ', isLoading: false })
      })
      .catch(error => {
        reject({ isDialogOpen: true, dialogMessage: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', isLoading: false })
      })
  })
}

const createUser = (email, password, isStaff) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const userid = await firebase.auth().currentUser.uid
        const pin_code = await getPincode(userid, appid)
        resolve({ isAuthed: true, level: 2, isStaff, userid, appid, pin_code })
      })
      .catch(error => {
        let dialogMessage = 'กรุณาลองใหม่อีกครั้ง'
        if (error.code === 'auth/email-already-in-use') dialogMessage = 'อีเมลนี้ถูกใช้งานแล้ว ' + dialogMessage
        reject({ isDialogOpen: true, dialogMessage, errorCode: error.code, errorMessage: error.message })
      })
  })
}

const updateProfile = (userid, appid, profile) => {
  return new Promise(async (resolve, reject) => {
    const path = `${server_ip}profile/info`
    const data = await JSON.stringify({ userid, appid, profile })

    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(() => resolve({ isComplete: true }))
      .catch(error => {
        const dialogMessage = 'กรุณาลองใหม่อีกครั้ง ' + error.code + ' ' + error.message
        reject({ isDialogOpen: true, dialogMessage, errorCode: error.code, errorMessage: error.message })
      })
  })
}

const getPincode = (userid, appid) => {
  return new Promise((resolve, reject) => {
    const path = `${server_ip}pin_code/generate?appid=${appid}&userid=${userid}`

    fetch(path).then(res => res.json()).then(res => resolve(res.pin_code)).catch(res => reject(res.errorMessage))
  })
}

export { getUserStatus, signIn, signOut, createUser, updateProfile }
