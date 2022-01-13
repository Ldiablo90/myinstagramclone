import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
const MainScreen = () => {
    const signOutBtn = () =>{
        signOut(getAuth())
    }
    return (
        <View>
            <Text>{ getAuth().currentUser.uid }</Text>
            <TouchableOpacity onPress={signOutBtn}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MainScreen
