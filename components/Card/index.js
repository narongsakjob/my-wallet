import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

const Card = ({ item, navigation }) => {
  const handleWallet = () => {
    navigation.navigate('Wallet', {
      key: item.key,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={handleWallet}>
      <View>
        <Text>{item.name} {item.total}.00</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Card