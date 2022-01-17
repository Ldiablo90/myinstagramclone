import React from 'react'
import { View, Text } from 'react-native'
import Header from './Header'

const Feed = ({ navigation }) => {
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header navigation={navigation}/>
        </View>
    )
}

export default Feed
