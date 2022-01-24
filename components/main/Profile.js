import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import Title from './profile/Title'
import Userinfo from './profile/Userinfo'
import { connect } from 'react-redux'
import Posts from './profile/Posts'

const Profile = (props) => {

    const { currentUser, posts, navigation } = props

    return (
        <View style={styles.container}>
            <Title navigation={navigation} />
            <Userinfo currentUser={currentUser} posts={posts} />
            <Posts posts={posts}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})


export default connect(mapStateToProps, null)(Profile);
