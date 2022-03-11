import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import Header from './Header'

const Feed = ({posts}) => {
    return (
        <View style={styles.outwrapper}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={posts}
                renderItem={({item}) => (
                    <View>
                        <View style={styles.itemuserwrapper}>
                            <View style={styles.itemuserinfo}>
                                <Image source={{ uri: item.user.profileimg}} style={styles.itemuserimg} />
                                <Text>{item.user.email}</Text>
                            </View>
                        </View>
                        <Image style={{ width:"100%", height:250}} source={{uri: item.downloadURL}}/>
                        
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    outwrapper:{
        flex:1,
    },
    itemuserwrapper:{
        flexDirection: 'row',
        alignItems:'center',
        margin:5
    },
    itemuserinfo:{
        flexDirection:'row',
        alignItems:'center'
    },
    itemuserimg:{
        width:35,
        height:35,
        borderRadius:"50%"
    }
});


export default Feed
