import React, { useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import AntDesign from 'react-native-vector-icons/AntDesign' 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser } from '../redux/actions/index';
import Home from '../components/main/Home'
import Search from '../components/main/Search'
import Video from '../components/main/Video'
import Shop from '../components/main/Shop'
import Profile from '../components/main/Profile'



const MainScreen = (props) => {

    useEffect(() => {
        props.fetchUser()
    }, [])

    const Tab = createMaterialBottomTabNavigator()

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" barStyle={{backgroundColor:'white'}} labeled={false} >
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home-variant" color={color} size={26} />
                    )
                }}/>
                <Tab.Screen name="Search" component={Search} options={{
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="search1" color={color} size={26} />
                    )
                }}/>
                <Tab.Screen name="Video" component={Video} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="ondemand-video" color={color} size={26} />
                    )
                }}/>
                <Tab.Screen name="Shop" component={Shop} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="shopping-outline" color={color} size={26} />
                    )
                }}/>
                <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="account-circle" color={color} size={26} />
                    )
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (store) =>({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch)=> bindActionCreators({
    fetchUser
},dispatch)



export default connect(mapStateToProps, mapDispatchProps)(MainScreen)
// export default MainScreen
