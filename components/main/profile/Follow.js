import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import { fireAuth, fireStore } from '../../../firebase';

const auth = fireAuth.getAuth();
const { getFirestore, setDoc, getDoc, doc, deleteDoc } = fireStore;

const Follow = ({ uid, follows }) => {

    const db = getFirestore();
    const innerDoc = doc(db, 'following', auth.currentUser.uid)

    const [following, setFollowing] = useState(false);

    const outDoc = doc(innerDoc, 'userFollowing', uid)

    useEffect(() => {
        getDoc(outDoc)
            .then(snapshot => console.log(snapshot.data()))
    }, []);

    const follow = () => { setDoc(outDoc, {}); setFollowing(true); };
    const unFollow = () => { deleteDoc(outDoc); setFollowing(false); };

    return (
        <View>
            {following ?
                <Button title='팔로잉' onPress={() => unFollow()} /> :
                <Button title='팔로우' onPress={() => follow()} />}
        </View>
    );
};

export default Follow;
