import React from 'react'
import { Button, TextInput, StyleSheet } from 'react-native'
import { withState, compose } from 'recompose'

const enhance = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('rePassword', 'setRePassword', '')
)

const SignUp = ({
  email, password, rePassword, setEmail, setPassword, setRePassword, firebase
}) => (
  <>
    <TextInput
      value={email}
      placeholder={'Email'}
      onChangeText={(val) => setEmail(val)}
      style={styles.input}
    />
    <TextInput
      value={password}
      placeholder={'Password'}
      onChangeText={(val) => setPassword(val)}
      secureTextEntry={true}
      style={styles.input}
    />
     <TextInput
      value={rePassword}
      placeholder={'Re-Password'}
      onChangeText={(val) => setRePassword(val)}
      secureTextEntry={true}
      style={styles.input}
    />
    <Button
      title='Register'
      onPress={() => firebase.doCreateUserWithEmailAndPassword(email, password, rePassword)}
    />
  </>
)

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default enhance(SignUp)