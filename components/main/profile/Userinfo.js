import { View, Text, Image, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';

const Userinfo = ({ currentUser, posts }) => {
  
  const [myfollow,setMyfollow]= useState([])
  const [myfollowing,setMyfollowing]= useState([])

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: currentUser.profileimg }} style={styles.profileimg}></Image>
        <Text style={styles.profilename}>{currentUser.name}</Text>
      </View>
      <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-around'}}>
        <View style={{ alignItems: "center" }}>
          <Text>{posts.length}</Text>
          <Text>게시물</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>{myfollow.length}</Text>
          <Text>팔로워</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>{myfollowing.length}</Text>
          <Text>팔로잉</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileimg: {
    width: 110,
    height: 110,
  },
  profilename: {
    fontSize: 17,
    fontWeight: '400',
  },
})




export default Userinfo;
