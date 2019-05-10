import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { compose, withHandlers, withState } from 'recompose'

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
          <Text>Sign In</Text>
          <SignIn {...props} />
          <Button title='Sign Up' onPress={() => setStatus('signup')} />
        </>
        :
        <>
          <Text>Sign Up</Text>
          <SignUp {...props} />
          <Button title='Back' onPress={() => setStatus('signin')} />
        </>
    }
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default enhance(LoginScreen)
