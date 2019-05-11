import React from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { compose, withState, lifecycle } from 'recompose'

import { withAuthentication } from '../components/Session'


const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
]
const currentDate = new Date();

const Wallet = ({ currentMonth, currentYear, navigation, walletName, walletAmount, listTask }) => {
  const key = navigation.getParam('key', 'NO-KEY')

  return (
    <View>
      <Text>{`${currentMonth} ${currentYear}`}</Text>
      <Text>{walletName}</Text>
      <Text>{walletAmount}</Text>
      {
        listTask.map((val, index) => (
          <View key={`${val.day}${currentMonth}${currentYear}-${index}`}>
            <Text>{`${val.day} ${currentMonth} ${currentYear}`}</Text>
            <FlatList
              data={val.tasks}
              renderItem={({item}) => <Text>{item.desc} {item.price}</Text>}
            />
          </View>
        ))
      }
      <Button title='+' onPress={() => navigation.navigate('CreateTask', {
        key: key,
      })}  />
      <Button title='Back' onPress={() => navigation.navigate('Main')}  />
    </View>
  )
}

export default compose(
  withState('listTask', 'setListTask', []),
  withState('currentMonth', 'setCurrentMonth', monthNames[currentDate.getMonth()]),
  withState('currentDate', 'setCurrentDate', currentDate.getDate()),
  withState('currentYear', 'setCurrentYear', currentDate.getFullYear()),
  withAuthentication,
  lifecycle({
    componentDidMount() {
      const {
        firebase,
        navigation,
        currentMonth,
        currentYear,
        setListTask
      } = this.props
      const key = navigation.getParam('key', 'NO-KEY')

      firebase.database.child(firebase.auth.currentUser.uid)
      .child('wallet')
      .child(key)
      .child('schedule')
      .child(`${currentMonth}${currentYear}`)
      .child('task')
      .on('value', snapshot => {
        const tasks = snapshot.val()
        let tempArr = []
        if (tasks !== null) {
          console.log(tasks)
          Object.keys(tasks).forEach((task, index) => {
            tempArr.push({ day: task, tasks: [] })
            Object.keys(tasks[task]).forEach(val => {
              tempArr[index].tasks.push({
                key: val,
                desc: tasks[task][val].desc,
                price:  tasks[task][val].price,
                type:  tasks[task][val].type,
              })
            })
          })
        }
        setListTask(tempArr)
      })
    }
  })
)(Wallet)