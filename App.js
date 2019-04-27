import React from 'react';
import { SafeAreaView, Text, View } from 'react-native'
import {createStackNavigator, createAppContainer} from 'react-navigation'

import Firebase, { FirebaseContext } from './components/Firebase/'
import { withAuthentication } from './components/Session/'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

const Home = ({ ...props }) => {
  const { authUser } = props
  return (
    authUser === false ?
      <Text>Loading</Text> :
      authUser === null ?
        <LoginScreen /> :
        <HomeScreen />
  )
}

const Component = withAuthentication(Home)

const App = ({ ...props }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <SafeAreaView>
        <Component />
      </SafeAreaView>
    </FirebaseContext.Provider>
  )
}

export default App