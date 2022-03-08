import React,{ useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Header from './home/Header'
import Feed from './home/Feed'
import { connect } from 'react-redux'

const Home = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if(props.userLoaded === props.following.length){
            props.following.forEach( follow => {
                const user = props.users.find(el => el.uid === follow.id );
                if(user != undefined){
                    posts = [...posts, ...user.posts]
                }
            });
        }
        posts.sort((x,y) => {
            return x.creation - y.creation;
        })
        setPosts(posts);
    }, [props.userLoaded, props.following])
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header navigation={props.navigation} />
            <Feed posts={posts} />
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
    following: store.userState.following,
    users: store.usersState.users,
    userLoaded: store.usersState.userLoaded,
})


export default connect(mapStateToProps, null)(Home);
