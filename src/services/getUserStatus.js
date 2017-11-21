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

export { getUserStatus }
