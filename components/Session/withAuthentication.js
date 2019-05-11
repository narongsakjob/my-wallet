import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: false,
        listWallet: [],
        totalWallet: 0,
        walletName: '',
        walletAmount: 0,
      }
    }

    componentDidMount() {
      const { firebase, navigation } = this.props
      const key = navigation.getParam('key', 'NO-KEY')

      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        if(authUser) {
          this.setState({ authUser: authUser })
          firebase.database.child(authUser.uid)
          .on('value', snapshot => {
            if (!snapshot.exists()) {
              firebase.database.child(authUser.uid)
                .set({ total: 0 })
            } else {
              this.getListItem(snapshot.val())
            }
          })

          if (key !== 'NO-KEY') {
            firebase.database.child(authUser.uid)
            .child('wallet')
            .child(key)
            .on('value', snapshot => {
              this.getItem(snapshot.val())
            })
          }
        } else {
          this.setState({ authUser: null })
        }
      })
    }

    componentWillUnmount() {
      this.listener()
    }

    getListItem = value => {
      this.setState({ totalWallet: value.total })
      const wallets = value.wallet
      let tempArr = []
      if (wallets !== undefined) {
        Object.keys(wallets).forEach(val => {
          tempArr.push({ key: val, name: wallets[val].name, total: wallets[val].total })
        })
      }
      this.setState({ listWallet: tempArr })
    }


    getItem = value => {
      this.setState({
        walletName: value.name,
        walletAmount: value.total
      })
    }

    render() {
      const authUser = this.state
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.state} {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
