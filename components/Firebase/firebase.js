import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import firebaseConfig from '../../config/firebase'

const config = firebaseConfig

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.database = app.database().ref()

    this.googleProvider = new app.auth.GoogleAuthProvider()
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

  doSignOut = () => this.auth.signOut()

  createWallet = (name) => {
    if (this.auth.currentUser === undefined) return;
    return this.database.child(this.auth.currentUser.uid).child('wallet').push().set({
      name: name,
      total: 0
    })
  }

  editWallet = (name, key) => {
    if (this.auth.currentUser === undefined) return;
    return this.database.child(this.auth.currentUser.uid).child('wallet')
      .child(key)
      .child('name')
      .set(name)
  }

  deleteWallet = (key) => {
    if (this.auth.currentUser === undefined) return;

    const databaseRef = this.database.child(this.auth.currentUser.uid)
    const walletRef = databaseRef.child('wallet').child(key)

    databaseRef.once('value', snapshot => {
      const totalRef = parseFloat(snapshot.val()['total'])
      const totalWallet = parseFloat(snapshot.val()['wallet'][key]['total'])
    
      databaseRef.child('total').set(totalRef - totalWallet)
      walletRef.set(null)
    })
  }

  createTask = ({ desc, type, key, value }) => {
    if (this.auth.currentUser === undefined) return;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    const currentDate = new Date();
    const taskId = `${monthNames[currentDate.getMonth()]}${currentDate.getFullYear()}`
  
    const databaseRef = this.database.child(this.auth.currentUser.uid)
    const walletRef = databaseRef.child('wallet').child(key)
    const taskRef = walletRef.child('schedule').child(taskId)

    return databaseRef.once('value', snapshot => {
      const totalRef = parseFloat(snapshot.val()['total'])
      const totalWallet = parseFloat(snapshot.val()['wallet'][key]['total'])
      const realValue = parseFloat(type === 'income' ? value : -1*value)

      if (snapshot.val()['wallet'][key]['schedule'] === undefined) {
        taskRef.child('total').set(realValue)
      } else {
        const totalTask = parseFloat(snapshot.val()['wallet'][key]['schedule'][taskId]['total'])
        taskRef.child('total').set(totalTask + realValue)
      }
    
      databaseRef.child('total').set(totalRef + realValue)
      walletRef.child('total').set(totalWallet + realValue)
      taskRef.child('task')
        .child(currentDate.getDate())
        .push()
        .set({
          type: type,
          price: value,
          desc: desc
        })
    })
  }

  deleteTask = ({ key, taskId, keyTask, day }) => {
    if (this.auth.currentUser === undefined) return;
    
    const databaseRef = this.database.child(this.auth.currentUser.uid)
    const walletRef = databaseRef.child('wallet').child(key)
    const taskRef = walletRef.child('schedule').child(taskId)
    const idRef = taskRef.child('task').child(day).child(keyTask)


    databaseRef.once('value', snapshot => {
      const totalRef = parseFloat(snapshot.val()['total'])
      const totalWallet = parseFloat(snapshot.val()['wallet'][key]['total'])
      const totalTask = parseFloat(snapshot.val()['wallet'][key]['schedule'][taskId]['total'])
      const removeRef = snapshot.val()['wallet'][key]['schedule'][taskId]['task'][day][keyTask]

      let removeValue = parseFloat(removeRef.price)
      removeValue = removeRef.type === 'income' ? -1*removeValue : removeValue
    
      databaseRef.child('total').set(totalRef + removeValue)
      walletRef.child('total').set(totalWallet + removeValue)
      taskRef.child('total').set(totalTask + removeValue)
      idRef.set(null)
    })
  }
}
export default Firebase
