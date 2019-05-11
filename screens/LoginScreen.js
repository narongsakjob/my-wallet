import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { compose, withHandlers, withState } from 'recompose'
import { Text } from 'react-native-elements'

import SignIn from '../components/Authentication/SignIn'
import SignUp from '../components/Authentication/SignUp'

const enhance = compose(
  withState('status', 'setStatus', 'signin'),
  withHandlers({
    setStatus: ({ setStatus }) => value => setStatus(value),
  })
)

const LoginScreen = ({
  status, setStatus, ...props
}) => (
  <View style={styles.container}>
    {
      status === 'signin' ?
        <>
          <Text h2 style={{ marginBottom: 15, color: '#EA8B38' }}>My wallet</Text>
          <Text h3 style={{ marginBottom: 10 }}>Sign In</Text>
          <SignIn {...props} />
          <View style={{ alignSelf: 'flex-end' }}>
            <Button title='Create Account' onPress={() => setStatus('signup')} color='#000' />
          </View>
        </>
        :
        <>
          <Text h3 style={{ marginBottom: 10 }}>Sign Up</Text>
          <SignUp {...props} />
          <View style={{ alignSelf: 'flex-end' }}>
            <Button title='Sign in' onPress={() => setStatus('signin')} color='#000' />
          </View>
        </>
    }
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%'
  },
});

export default enhance(LoginScreen)
