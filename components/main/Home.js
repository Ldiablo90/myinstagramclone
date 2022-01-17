import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Feed from './home/Feed'
import AddFeed from './home/AddFeed'

const Stack = createNativeStackNavigator()

const screenOption = {
    headerShown: false
}

const Home = () => {
    return (
        <Stack.Navigator initialRouteName='Feed' screenOptions={screenOption}>
            <Stack.Screen name='Feed' component={Feed} />
            <Stack.Screen name='AddFeed' component={AddFeed} />
        </Stack.Navigator>
    )
}

export default Home
