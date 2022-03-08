import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import Header from './Header'

const Feed = ({posts}) => {
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={posts}
                renderItem={({item}) => (
                    <View style={{flex:1}}>
                        <Text>{item.user.email}</Text>
                        <Image style={{ width:"100%", height:250}} source={{uri: item.downloadURL}}/>
                        
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Feed
