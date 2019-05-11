import React from 'react'
import { View, Text, TextInput, Button, Picker } from 'react-native'
import { compose, withState } from 'recompose'

import { withFirebase } from '../components/Firebase'


const CreateTask = ({
  firebase, desc, setDesc, navigation, value, setValue, type, setType
}) => {
  const key = navigation.getParam('key', 'NO-KEY')

  const createTask = async () => {
    if (desc !== '') {
      await firebase.createTask({ desc, key, value, type })
      navigation.navigate('Wallet',{
        key: key,
      })
    } else {
      alert('Name is empty!')
    }
  }

  const getTitle = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
  
    const currentDate = new Date();
    return `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  }


  return (
    <View>
      <Text>{getTitle()}</Text>
      <TextInput
        value={desc}
        placeholder='Description'
        onChangeText={(val) => setDesc(val)}
      />
      <TextInput
        value={value}
        keyboardType={'numeric'}
        placeholder='Value'
        onChangeText={(val) => setValue(val)}
      />
      <Picker
        selectedValue={type}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue) =>
          setType(itemValue)
        }>
        <Picker.Item label="Income" value="income" />
        <Picker.Item label="Expenses" value="expenses" />
      </Picker>
      <Button
        title='Create'
        onPress={() => createTask()}
      />
       <Button
        title='Back'
        onPress={() => navigation.navigate('Wallet',{
          key: key,
        })}
      />
    </View>
  )
}

export default compose(
  withState('desc', 'setDesc', ''),
  withState('value', 'setValue', ''),
  withState('type', 'setType', 'income'),
  withFirebase,
)(CreateTask)