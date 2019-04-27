import app from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../config/firebase'

const config = firebaseConfig

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
  }

}
export default Firebase
