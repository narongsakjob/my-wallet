import React from 'react'
import { View, Text, TouchableWithoutFeedback, Button, Picker, StyleSheet } from 'react-native'
import { compose, withState } from 'recompose'
import Icon from 'react-native-vector-icons/Feather'
import { Input } from 'react-native-elements'

import { withFirebase } from '../components/Firebase'


const CreateTask = ({
  firebase, desc, setDesc, navigation, value, setValue, type, setType, setLimit, limit
}) => {
  const key = navigation.getParam('key', 'NO-KEY')

  const createTask = async () => {
    if (desc !== '' && value !== '') {
      await firebase.createTask({ desc, key, value, type })
      navigation.navigate('Wallet',{
        key: key,
      })
    } else {
      alert('Field is empty!')
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
      <View style={styles.banner}>
        <TouchableWithoutFeedback  onPress={() => navigation.navigate('Wallet',{
          key: key,
        })}>
          <Icon
            name='arrow-left'
            size={26}
            color='#fff'
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{getTitle()}</Text>
        <TouchableWithoutFeedback onPress={() => createTask()}>
          <Icon
            name='check'
            size={26}
            color='#fff'
          />
        </TouchableWithoutFeedback>
      </View>
      <Input
        value={desc}
        placeholder='Description'
        onChangeText={(val) => {
          if (val.length <= 25) {
            setDesc(val)
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
      <Input
        value={value}
        keyboardType={'numeric'}
        placeholder='Amount'
        onChangeText={(val) => setValue(val)}
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
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) =>
          setType(itemValue)
        }>
        <Picker.Item label="Income" value="income" />
        <Picker.Item label="Expenses" value="expenses" />
      </Picker>
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
  withState('desc', 'setDesc', ''),
  withState('value', 'setValue', ''),
  withState('type', 'setType', 'income'),
  withState('limit', 'setLimit', '0'),
  withFirebase,
)(CreateTask)