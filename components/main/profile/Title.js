import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react';
import { connect } from 'react-redux';

const Title = (props) => {
    const { currentUser, navigation} = props
    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'600', fontSize:18}}>{currentUser.email}</Text>
            <View style={styles.icons}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('AddFeedScreen')}>
                    <MaterialCommunityIcons name='plus-box-outline' size={26} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} >
                    <MaterialCommunityIcons name='menu' size={26} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:15,
        marginTop:12,
    },
    icons:{
        flexDirection:'row'
    },
    icon:{marginLeft:7}
})

const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps,null)(Title);
