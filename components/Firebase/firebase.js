import firebase from 'firebase'
import app from 'firebase/app'
import database from 'firebase/database'
import 'firebase/auth'
import firebaseConfig from '../../config/firebase'

const config = firebaseConfig

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.database = app.database().ref()

    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
  }

  doCreateUserWithEmailAndPassword = (email, password, rePassword) =>{
    if (password === rePassword && password !== '' && rePassword !== '') {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => alert('Account Created'))
      .catch(error => alert(error))
    } else {
      alert('Password and Re-pasword does not match')
    }
  }

  doSignInWithEmailAndPassword = (email, password) =>{
    this.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      alert(error)
    })
  }

  doSignInWithGoogle = async () => {
    const result = await Expo.Google.logInAsync({
      androidClientId:"970509861000-rieiu7kpuod5g4j2f2dhkh9ipjq8e6du.apps.googleusercontent.com",
      iosClientId:"970509861000-rieiu7kpuod5g4j2f2dhkh9ipjq8e6du.apps.googleusercontent.com",
      webClientId:"970509861000-463aa9sbrc1ah0ab05a433qndplt092e.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    const { idToken, accessToken } = result;
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    this.auth.signInAndRetrieveDataWithCredential(credential)
  }

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  doSignOut = () => this.auth.signOut()

  createWallet = (name) => {
    if (this.auth.currentUser === undefined) return;
    this.database.child(this.auth.currentUser.uid).push().set({
      name: name,
      total: 0
    }).then(() => alert('Success created'))
  }
}
export default Firebase
