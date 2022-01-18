import React from 'react'
import { View } from 'react-native'
import Header from './home/Header'

const Home = (navigation) => {
    return (
        <View>
            <Header navigation={navigation} />
        </View>
    )
}

export default Home
