import 'firebase/auth'
import firebase from './firebase'

const server_ip = 'http://192.168.1.54:5000/'

const getUserStatus = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid
        const path = server_ip + 'profile/info?appid=PHRapp&userid=' + uid

        fetch(path).then(res => res.json()).then(res => {
          let profile = {}
          if (res.data) profile = res.data.profile
          resolve({ authed: true, isLoading: false, uid, profile })
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
        const path = server_ip + 'profile/info?appid=PHRapp&userid=' + uid

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

const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resolve({ isAuthed: true, level: 2, isStaff: true })
      })
      .catch(error => {
        let dialogMessage = 'กรุณาลองใหม่อีกครั้ง'
        if (error.code === 'auth/email-already-in-use') dialogMessage = 'อีเมลนี้ถูกใช้งานแล้ว ' + dialogMessage
        reject({ isDialogOpen: true, dialogMessage, errorCode: error.code, errorMessage: error.message })
      })
  })
}

export { getUserStatus, signIn, signOut, createUser }
