import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { compose, withState } from 'recompose'

import { withFirebase } from '../components/Firebase'


const CreateWallet = ({ firebase, name, setName, navigation, ...props }) => {
  const createWallet = () => {
    if (name !== '') {
      firebase.createWallet(name)
    } else {
      alert('Name is empty!')
    }
  }

  return (
    <View>
      <Text>Create Wallet</Text>
      <TextInput
        value={name}
        placeholder='Wallet name'
        onChangeText={(val) => setName(val)}
      />
      <Button
        title='Create'
        onPress={() => createWallet()}
      />
       <Button
        title='Back'
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  )
}

export default compose(
  withState('name', 'setName', ''),
  withFirebase,
)(CreateWallet)