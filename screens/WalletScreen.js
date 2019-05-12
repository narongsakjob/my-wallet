import React from 'react'
import { View, FlatList, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native'
import { compose, withState, lifecycle } from 'recompose'
import { Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

import { withAuthentication } from '../components/Session'
import { TaskCard } from '../components/Card'

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]
const currentDate = new Date();

const Wallet = ({
  currentDate, currentMonth, currentYear, navigation, walletName, walletAmount, listTask, monthBalance, firebase
}) => {
  const key = navigation.getParam('key', 'NO-KEY')

  return (
    <View style={{ height: '100%' }}>
      <View style={styles.banner}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Main')}>
          <Icon
            name='arrow-left'
            size={26}
            color='#fff'
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{walletName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateWallet', {
              key: key
            })}>
              <Icon 
                name='edit-2'
                size={26}
                color='#fff'
                style={{ marginRight: 5 }}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
               Alert.alert(
                'Confirm',
                'Do you want to delete this wallet ?',
                [
                  {text: 'OK', onPress: () =>  {
                    firebase.deleteWallet(key)
                    navigation.navigate('Main')
                  }
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
              )
            }}>
              <Icon
                name='trash'
                size={26}
                color='#fff'
              />
            </TouchableWithoutFeedback>
          </View>
      </View>
      <View style={styles.balance}>
        <Text h5 style={styles.textBalance}>Wallet Balance</Text>
        <View style={styles.titleWrapper}>
          <Text h4 style={styles.textBalance}>{walletAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        </View>
        <Text h5 style={styles.textBalance}>Monthly balance : {monthBalance.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
      </View>
      <View style={styles.bannerCalendar}>
        <Icon
          name='calendar'
          size={26}
          color='#000'
        />
        <Text>{`${currentMonth} ${currentYear}`}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateTask', {
        key: key,
      })}>
        <View style={styles.addContainer} >
          <Icon
            name='plus'
            size={18}
            color='#CE8116'
            style={{ marginRight: 20 }}
          />
          <Text style={{ color: '#CE8116'}}>Add Event</Text>
        </View>
      </TouchableWithoutFeedback>
        <View style={styles.bannerDate}>
          <Text style={styles.labelDate}>{`${currentDate} ${currentMonth} ${currentYear}`}</Text>
        </View>
        <FlatList
          data={listTask}
          renderItem={({item}) => <TaskCard keyId={key} item={item}/>}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#EA8B38',
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 18
  },
  balance: {
    backgroundColor: '#EA8B38',
    padding: 25,
    margin: 20, 
  },
  textBalance: {
    color: '#fff',
    textAlign: 'center'
  },
  titleWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  addContainer: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    flexDirection: "row",
  },
  bannerCalendar: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bannerDate: {
    padding: 5,
    backgroundColor: '#C4C4C4'
  },
  labelDate: {
    textAlign: 'center',
    color: '#4D4D4D'
  }
})

export default compose(
  withState('listTask', 'setListTask', []),
  withState('currentMonth', 'setCurrentMonth', monthNames[currentDate.getMonth()]),
  withState('currentDate', 'setCurrentDate', currentDate.getDate()),
  withState('currentYear', 'setCurrentYear', currentDate.getFullYear()),
  withState('monthBalance', 'setMonthBalance', 0),
  withAuthentication,
  lifecycle({
    componentDidMount() {
      const {
        firebase,
        navigation,
        currentMonth,
        currentYear,
        currentDate,
        setListTask,
        setMonthBalance
      } = this.props
      const key = navigation.getParam('key', 'NO-KEY')

      firebase.database.child(firebase.auth.currentUser.uid)
      .child('wallet')
      .child(key)
      .child('schedule')
      .child(`${currentMonth}${currentYear}`)
      .on('value', snapshot => {
        let tempArr = []
        if (snapshot.hasChild('task')) {
          const monthBalance = snapshot.val()['total']
          const tasks = snapshot.val()['task'][currentDate]
          if (tasks === undefined) return
          setMonthBalance(monthBalance)
          Object.keys(tasks).forEach(val => {
            tempArr.push({
              desc: tasks[val].desc,
              price:  parseFloat(tasks[val].price),
              type:  tasks[val].type,
              keyTask: val,
              taskId: `${currentMonth}${currentYear}`,
              day: currentDate
            })
          })
        }
        setListTask(tempArr)
      })
    }
  })
)(Wallet)
