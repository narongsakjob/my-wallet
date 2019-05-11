import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Input } from 'react-native-elements'
import { compose, withState, lifecycle } from 'recompose'
import Icon from 'react-native-vector-icons/Feather'

import { withAuthentication } from '../components/Session'

const CreateWallet = ({ firebase, walletName, setWalletName, navigation, limitWalletName }) => {
  const key = navigation.getParam('key', 'NO-KEY')

  const createWallet = async () => {
    if (walletName !== '') {
      if (key !== 'NO-KEY') {
        await firebase.editWallet(walletName, key)

        navigation.navigate('Wallet', {
          key: key
        })
      } else {
        await firebase.createWallet(walletName)
        navigation.navigate('Main')
      }
    } else {
      alert('Name is empty!')
    }
  }

  return (
    <View>
      <View style={styles.banner}>
        <TouchableWithoutFeedback onPress={() => {
          if (key !== 'NO-KEY') {
            navigation.navigate('Wallet', {
              key: key
            })
          } else {
            navigation.navigate('Main')
          }
        }}>
          <Icon
            name='arrow-left'
            size={26}
            color='#fff'
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Create Wallet</Text>
        <TouchableWithoutFeedback onPress={() => createWallet()}>
          <Icon
            name='check'
            size={26}
            color='#fff'
          />
        </TouchableWithoutFeedback>
      </View>
      <Input
        value={walletName}
        placeholder='Wallet name'
        onChangeText={(val) => {
          if (val.length <= 15) {
            setWalletName(val)
          }
        }}
        containerStyle={styles.textInputContainer}
        inputContainerStyle={styles.textInput}
        leftIcon={
          <Icon
            name='edit'
            size={26}
            color='#000'
            style={{ marginRight: 5 }}
          />
        }
      />
      <Text style={styles.limitLabel}>{limitWalletName}/15</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#EA8B38',
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 18
  },
  textInputContainer: {
    marginTop: 40,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
  },
  limitLabel: {
    textAlign: 'right',
    marginRight: 20
  }
})

export default compose(
  withState('limit', 'setLimit', '0'),
  withAuthentication,
)(CreateWallet)