import React from 'react'
import { View, Text, Button } from 'react-native'

const LoginScreen = ({ ...props }) => (
  <View>
    <Text>Login Page</Text>
    <Button
      title='Login'
      onPress={() => console.log('test')}
    />  
  </View>
)

export default LoginScreen
