import React from 'react'
import { View, TouchableWithoutFeedback, Alert, FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'

import { withAuthentication } from '../components/Session'
import Card from '../components/Card'

const HomeScreen = ({ firebase, navigation, totalWallet, listWallet }) => {
  return (
    <View style={{ height:'100%' }}>
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
        <View style={{ position: 'absolute', top: 10, alignSelf: 'flex-end' }}>
          <TouchableWithoutFeedback onPress={() => {
            Alert.alert(
              'Confirm',
              'Do you want to logout ?',
              [
                {text: 'OK', onPress: () => firebase.doSignOut()},
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ],
            );
          }}>
            <Icon
                name='log-out'
                size={26}
                color='#fff'
                style={{ paddingRight: 8 }}
              />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.total}>
          <Icon
              name='credit'
              size={18}
              color='#CE8116'
            />
          <Text style={styles.textTotal}>{totalWallet.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateWallet')}>
        <View style={styles.addContainer} >
          <Icon
            name='circle-with-plus'
            size={18}
            color='#CE8116'
            style={{ marginRight: 20 }}
          />
          <Text style={{ color: '#494949'}}>Add Wallet</Text>
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={listWallet}
        renderItem={({item}) => <Card navigation={navigation} item={item} />}
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
  },
  addContainer: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: '#CE8116'
  }
})

export default withAuthentication(HomeScreen)