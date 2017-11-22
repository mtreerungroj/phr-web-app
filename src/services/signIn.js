import 'firebase/auth'
import firebase from './firebase'

const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve({ authed: true, isLoading: false })
      })
      .catch(error => {
        reject({ isDialogOpen: true, errorMessage: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง', isLoading: false })
      })
  })
}

export { signIn }
