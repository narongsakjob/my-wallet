import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { ListItem } from 'react-native-elements'

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

export default Card