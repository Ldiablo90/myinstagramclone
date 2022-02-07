import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';

const Posts = ({ posts }) => {

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={3}
                horizontal={false}
                data={posts}
                renderItem={({ item }) => (
                    <Image
                        source={{uri:item.downloadURL}}
                        style={styles.image}
                    />
                )}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        flex: 1/3,
        aspectRatio: 1/1
    },
})
export default Posts;
