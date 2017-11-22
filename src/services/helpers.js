import 'firebase/auth'
import firebase from './firebase'

const getUserStatus = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) resolve({ authed: true, isLoading: false })
      else reject({ authed: false, isLoading: false })
    })
  })
}

const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve({ authed: true, isLoading: false })
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

export { getUserStatus, signIn, signOut }
