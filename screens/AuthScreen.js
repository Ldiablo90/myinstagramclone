import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

const Stack = createNativeStackNavigator()
const screenOption = {
    headerShown: false
}

const LoginScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={screenOption}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default LoginScreen
