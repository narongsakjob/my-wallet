import React from 'react'
import { Button, TextInput, StyleSheet } from 'react-native'
import { withState, compose, withHandlers } from 'recompose'

const enhance = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
)

const SignIn = ({ email, password, setEmail, setPassword, firebase }) => (
  <>
    <TextInput
      value={email}
      placeholder={'Email'}
      onChangeText={(email) => setEmail(email)}
      style={styles.input}
    />
    <TextInput
      value={password}
      placeholder={'Password'}
      onChangeText={(password) => setPassword(password)}
      secureTextEntry={true}
      style={styles.input}
    />
    <Button
      title='Login'
      onPress={() => firebase.doSignInWithEmailAndPassword(email, password)}
    />
    <Button
    title='Login with google'
    onPress={() => firebase.doSignInWithGoogle()}
    />
    <Button
      title='Login with facebook'
      onPress={() => firebase.doSignInWithFacebook()}
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

export default enhance(SignIn)