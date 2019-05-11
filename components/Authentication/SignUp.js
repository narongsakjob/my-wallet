import React from 'react'
import { StyleSheet } from 'react-native'
import { withState, compose } from 'recompose'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const enhance = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withState('rePassword', 'setRePassword', '')
)

const SignUp = ({
  email, password, rePassword, setEmail, setPassword, setRePassword, firebase
}) => (
  <>
    <Input
      value={email}
      placeholder={'Email'}
      onChangeText={(val) => setEmail(val)}
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
      onChangeText={(val) => setPassword(val)}
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
     <Input
      value={rePassword}
      placeholder={'Re-Password'}
      onChangeText={(val) => setRePassword(val)}
      secureTextEntry={true}
      containerStyle={styles.marginBottom}
      leftIcon={
        <Icon
          name='unlock-alt'
          size={24}
          color='black'
          style={{ paddingRight: 8 }}
        />
      }
    />
    <Button
      title='Register'
      buttonStyle={{ backgroundColor: '#EA8B38' }}
      containerStyle={styles.marginBottom}
      onPress={() => firebase.doCreateUserWithEmailAndPassword(email, password, rePassword)}
    />
  </>
)

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 25,
  },
})

export default enhance(SignUp)