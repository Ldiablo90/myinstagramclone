import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FindUserList from './search/FindUserList'
import { fireStore, fireAuth } from '../../firebase'

const { getFirestore, getDocs, where, query, collection } = fireStore;
const { getAuth } = fireAuth;
const db = getFirestore();
const dbCollection = collection(db, 'users');

const Search = (props) => {
    
    const [users, setUsers] = useState([])
    const [searchUsers, setSearchUsers] = useState(false)

    const chackUsers = (search) => {
        const firequery = query(dbCollection, where('name', '>=', search));
        const findUsers = getDocs(firequery);
        findUsers.then(snepshot => {
            let users = snepshot.docs.map(doc => {
                const id = doc.id;
                const data = doc.data();
                return { id, ...data }
            })
            setUsers(users)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchouter}>
                <View style={styles.searchinner}>
                    {!searchUsers
                        ? <View></View>
                        : <TouchableOpacity onPress={() => {
                            setSearchUsers(false)
                            setUsers([])
                        }}
                            style={{ marginRight: 5 }}>
                            <MaterialCommunityIcons name='arrow-left' color={'black'} size={24} />
                        </TouchableOpacity>
                    }
                    <TextInput
                        style={styles.searchinput}
                        onFocus={() => setSearchUsers(true)}
                        onChangeText={(search) => chackUsers(search)}
                        placeholder='Search'
                    />
                </View>
            </View>
            {!searchUsers ? <View><Text>search view</Text></View> : <FindUserList navigation={props.navigation} data={users} />}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchouter: {
        flexDirection: 'row',
        height: 50,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    searchinner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchinput: {
        flex: 1,
        height: 35,
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        padding: 5,
    }
})

export default Search
