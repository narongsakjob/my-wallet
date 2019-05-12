import React from 'react';
import { SafeAreaView, View } from 'react-native'
import { createAppContainer, createSwitchNavigator} from 'react-navigation'


import Firebase, { FirebaseContext } from './components/Firebase/'
import { withAuthentication } from './components/Session/'
import {
  HomeScreen,
  CreateWalletScreen,
  LoginScreen,
  WalletScreen,
  CreateTaskScreen
} from './screens/'

const Home = ({ ...props }) => {
  const { authUser } = props
  return (
    authUser === false ?
      null :
      authUser === null ?
        <LoginScreen firebase={props.firebase} /> :
        <HomeScreen {...props} />
  )
}

const MainScreen = withAuthentication(Home)

const MainNavigator = createSwitchNavigator({
  Main: {screen: MainScreen},
  CreateWallet: {screen: CreateWalletScreen},
  Wallet: {screen: WalletScreen},
  CreateTask: {screen: CreateTaskScreen}
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

console.disableYellowBox = true
export default App