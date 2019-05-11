import React from 'react'
import { StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { withState, compose } from 'recompose'
import Icon from 'react-native-vector-icons/FontAwesome'

const enhance = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
)

const SignIn = ({ email, password, setEmail, setPassword, firebase }) => (
  <>
    <Input
      value={email}
      placeholder={'Email'}
      onChangeText={(email) => setEmail(email)}
      containerStyle={styles.marginBottom}
      leftIcon={
        <Icon
          name='user'
          size={24}
          color='black'
          style={{ paddingRight: 8 }}
        />
      }
    />
    <Input
      value={password}
      placeholder={'Password'}
      onChangeText={(password) => setPassword(password)}
      secureTextEntry={true}
      containerStyle={styles.marginBottom}
      leftIcon={
        <Icon
          name='lock'
          size={24}
          color='black'
          style={{ paddingRight: 8 }}
        />
      }
    />
    <Button
      title='Login'
      onPress={() => firebase.doSignInWithEmailAndPassword(email, password)}
      buttonStyle={{ backgroundColor: '#EA8B38' }}
      containerStyle={styles.marginBottom}
    />
    <Button
      title='Login with'
      icon={
        <Icon
        name='google'
        size={24}
        color='#fff'
        style={{ paddingLeft: 8 }}
        />
      }
      iconRight
      buttonStyle={{ backgroundColor: '#DB4437' }}
      containerStyle={styles.marginBottom}
      onPress={() => firebase.doSignInWithGoogle()}
    />
  </>
)

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 25,
  },
})

export default enhance(SignIn)