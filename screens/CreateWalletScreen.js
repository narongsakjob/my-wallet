import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Input } from 'react-native-elements'
import { compose, withState } from 'recompose'
import Icon from 'react-native-vector-icons/Feather'

import { withFirebase } from '../components/Firebase'


const CreateWallet = ({ firebase, name, setName, navigation, limit, setLimit }) => {
  const createWallet = async () => {
    if (name !== '') {
      await firebase.createWallet(name)
      navigation.navigate('Main')
    } else {
      alert('Name is empty!')
    }
  }

  return (
    <View>
      <View style={styles.banner}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Main')}>
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
        value={name}
        placeholder='Wallet name'
        onChangeText={(val) => {
          if (val.length <= 25) {
            setName(val)
            setLimit(`${val.length}`)
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
      <Text style={styles.limitLabel}>{limit}/25</Text>
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
  withState('name', 'setName', ''),
  withState('limit', 'setLimit', '0'),
  withFirebase,
)(CreateWallet)