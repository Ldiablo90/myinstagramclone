import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

const Header = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.logowrapper}>
                <Image style={styles.logo} source={require(`../../../assets/instagramlogo.png`)} />

            </View>
            <View style={styles.iconWrapper}>
                <TouchableOpacity style={styles.icons}>
                    <MaterialCommunityIcons name='plus-box-outline' size={26} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons}>
                    <MaterialCommunityIcons name='heart-outline' size={26} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons}>
                    <Feather name='send' size={26} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:5,
        paddingHorizontal:10
    },
    logowrapper:{flex:1},
    logo: {
        width: 100,
        height: 28.8
    },
    iconWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icons:{
        marginLeft:7
    }
    
})