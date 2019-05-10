import React from 'react';
import { SafeAreaView, Text, View } from 'react-native'
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'

import Firebase, { FirebaseContext } from './components/Firebase/'
import { withAuthentication } from './components/Session/'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import CreateWalletScreen from './screens/CreateWalletScreen'

const Home = ({ ...props }) => {
  const { authUser } = props
  return (
    authUser === false ?
      <Text>Loading</Text> :
      authUser === null ?
        <LoginScreen firebase={props.firebase} /> :
        <HomeScreen {...props} />
  )
}

const MainScreen = withAuthentication(Home)

// MainScreen.navigationOptions = { header: null }

const MainNavigator = createSwitchNavigator({
  Main: {screen: MainScreen},
  CreateWallet: {screen: CreateWalletScreen},
});

const AppContainer = createAppContainer(MainNavigator)

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <SafeAreaView>
        <View>
          <AppContainer />
        </View>
      </SafeAreaView>
    </FirebaseContext.Provider>
  )
}


export default App