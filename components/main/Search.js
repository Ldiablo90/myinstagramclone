import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { fireStore, fireAuth } from '../../firebase'
import FindUserList from './search/FindUserList'

const { getFirestore, getDocs, where, query, collection } = fireStore
const { getAuth } = fireAuth
const firestore = getFirestore()
const fireCollection = collection(firestore, 'users')
const Search = () => {
    const [users, setUsers] = useState([])
    const [searchUsers, setSearchUsers] = useState(false)

    const fetchUsers = (search) => {
        const firequery = query(fireCollection, where('name', '>=', search));
        const findUsers = getDocs(firequery);
        findUsers.then(snepshot => {
            let users = snepshot.docs.map(doc => { const id = doc.id; const data = doc.data(); return { id, ...data } })
            setUsers(users)
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchouter}>
                <View style={styles.searchinner}>
                    {!searchUsers
                        ? <View></View>
                        : <TouchableOpacity onPress={()=> setSearchUsers(false)}>
                            <MaterialCommunityIcons name='arrow-left' color={'black'} size={24}/>
                          </TouchableOpacity>}
                    <TextInput
                        style={styles.searchinput}
                        onFocus={() => setSearchUsers(true)}
                        onChangeText={(search) => fetchUsers(search)}
                        placeholder='Search'
                    />

                </View>
            </View>
            {!searchUsers ? <View></View> : <FindUserList />}

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
        height: 40,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    searchinner: {
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
    },
    searchinput: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
        padding: 5,
    }
})

export default Search
