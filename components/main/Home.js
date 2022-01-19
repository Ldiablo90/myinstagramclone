import React from 'react'
import { View } from 'react-native'
import Header from './home/Header'

const Home = ({navigation}) => {
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header navigation={navigation} />
        </View>
    )
}

export default Home
