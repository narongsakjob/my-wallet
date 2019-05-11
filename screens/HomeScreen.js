import React from 'react'
import { View, Button, FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'

import { withAuthentication } from '../components/Session'
import Card from '../components/Card'

const HomeScreen = ({ firebase, navigation, totalWallet, listWallet }) => {
  return (
    <View>
      <View style={styles.banner}>
        <Text h4 style={styles.text}>
          <Icon
            name='wallet'
            size={26}
            color='#fff'
            style={{ paddingRight: 8 }}
          />
          My wallet
        </Text>
        <View style={styles.total}>
          <Icon
              name='credit'
              size={18}
              color='#CE8116'
            />
          <Text style={styles.textTotal}>{totalWallet.toFixed(2)}</Text>
        </View>
      </View>
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


const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#EA8B38',
    paddingVertical: 20,
    paddingHorizontal: 40
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  total: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  textTotal: {
    textAlign: 'center',
    color: '#CE8116',
    fontSize: 18
  }
})

export default withAuthentication(HomeScreen)