import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import Title from './profile/Title'
import Posts from './profile/Posts'
import Follow from './profile/follow'
import Userinfo from './profile/Userinfo'
import { fireAuth, fireStore } from '../../firebase'

const auth = fireAuth.getAuth();
const { getFirestore, getDoc, getDocs, doc, collection, query, orderBy } = fireStore;

const Profile = (props) => {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [master, setMaster] = useState(false);

    const { navigation } = props;

    useEffect(() => {
        const { currentUser, posts } = props;
        if(props.route.params.uid === auth.currentUser.uid){
            setUser(currentUser);
            setUserPosts(posts);
            setMaster(false);
        }
        else{
            setMaster(true);
            const db = getFirestore();
            const uid = props.route.params.uid;
            getDoc(doc(db,'users',uid))
            .then(snapshot => snapshot.exists?setUser(snapshot.data()):'')
            const datas = collection(doc(db,'posts',uid),'userPosts')
            const queryData = query(datas)
            getDocs(queryData)
            .then(snapshot => {
                if(!snapshot.empty){
                    let posts = snapshot.docs.map(doc=>{
                        const data = doc.data();const id = doc.id;
                        return {id, ...data}
                    })
                    setUserPosts(posts)
                }})
        }
    }, [props.route.params.uid, props.following]);
    if(user === null){ return <View />}
    return (
        <View style={styles.container}>
            <Title user={user.email} navigation={navigation} />
            <Userinfo currentUser={user} posts={userPosts} follows={props.following} />
            {master?<Follow uid={props.route.params.uid} follows={props.following}/>:null}
            <Posts posts={userPosts}/>
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
    posts: store.userState.posts,
    following: store.userState.following,
})


export default connect(mapStateToProps, null)(Profile);
