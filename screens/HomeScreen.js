import React from 'react'
import { withState, compose, lifecycle } from 'recompose'
import { View, Text, Button, FlatList } from 'react-native'

import { withAuthentication } from '../components/Session'
import Card from '../components/Card'

const HomeScreen = ({ firebase, navigation, totalWallet, listWallet }) => {
  return (
    <View>
      <Text style={{ textAlign: 'center' }}>My wallet</Text>
      <Text style={{ textAlign: 'center' }}>Total : {totalWallet}</Text>
      <Button 
        title='Add wallet'
        onPress={() => navigation.navigate('CreateWallet')}
      />
      <FlatList
        data={listWallet}
        renderItem={({item}) => <Card navigation={navigation} item={item} />}
      />
      <Button
        style={{ marginTop: '200px' }}
        title='Log out'
        onPress={() => firebase.doSignOut()}
      />
    </View>
  )
}

export default compose(
  withAuthentication
)(HomeScreen)