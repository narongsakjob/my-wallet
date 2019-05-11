import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

import { withFirebase } from '../Firebase'

const Card = ({ item, navigation }) => {
  const handleWallet = () => {
    navigation.navigate('Wallet', {
      key: item.key,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={handleWallet}>
      <ListItem
        title={item.name}
        subtitle={item.total.toFixed(2)}
        leftIcon={{ name: 'save' }} 
        rightIcon={{ name: 'chevron-right' }}
      />
    </TouchableWithoutFeedback>
  )
}

 const TaskComponent = ({ item, firebase, keyId }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{item.desc}</Text>
        <Text style={{ paddingRight: 5 }}>{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.containerLeft}>
        <TouchableWithoutFeedback onPress={() => {
          Alert.alert(
            'Confirm',
            'Do you want to delete this task ?',
            [
              {text: 'OK', onPress: () =>  firebase.deleteTask({
                key: keyId, taskId: item.taskId, keyTask: item.keyTask, day: item.day
              })},
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
          );
         }}>
          <Icon
            name='trash'
            size={18}
            color='#000'
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export const TaskCard = withFirebase(TaskComponent)

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
  },
  containerRight: {
    flexDirection: 'column',
  },
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default Card