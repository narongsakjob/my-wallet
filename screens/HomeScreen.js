import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = ({ firebase, navigation, ...props }) => (
  <View>
    <Text style={{ textAlign: 'center' }}>My wallet</Text>
    <Text style={{ textAlign: 'center' }}>Total : {}</Text>
    <Button 
      title='Add wallet'
      onPress={() => navigation.navigate('CreateWallet')}
    />
    <Button
      title='Log out'
      onPress={() => firebase.doSignOut()}
    />
  </View>
)

export default HomeScreen