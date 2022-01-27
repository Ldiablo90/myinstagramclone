import { Text, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { fireStore, fireAuth } from '../../../firebase'
import Semail from './Semail';
import Sname from './Sname';

const Tab = createMaterialTopTabNavigator();

const { getFirestore, getDocs, where, query, collection } = fireStore;
const { getAuth } = fireAuth;
const db = getFirestore();
const dbCollection = collection(db, 'users');


const FindUserList = ({ data }) => {

  const emailUsers = (search) => {
    const firequery = query(dbCollection, where('email', '>=', search));
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
    <Tab.Navigator>
      <Tab.Screen name='E-mail' component={Semail} initialParams={{data}}/>
      <Tab.Screen name='Name' component={Sname} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 10 },
  item: { marginHorizontal: 15 }
})

export default FindUserList;
