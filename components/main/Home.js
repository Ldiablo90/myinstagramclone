import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getAuth } from 'firebase/auth'

import Header from './home/Header'

const Home = () => {
    return (
        <View style={styles.wrapper}>
            <Header />
        </View>
    )
}

export default Home


const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'white',
    }
})