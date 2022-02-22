import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE } from '../constants'

import { fireAuth, fireStore } from '../../firebase'

const { getFirestore, doc, getDoc, getDocs, collection, orderBy, query, onSnapshot } = fireStore;
const { getAuth } = fireAuth;

const auth = getAuth()
const db = getFirestore();

export function fetchUser() {
    const outDoc = doc(db, 'users', auth.currentUser.uid)
    return (async (dispatch) => {
        const getSnapshot = await getDoc(outDoc)
        getSnapshot.exists ?
            dispatch({
                type: USER_STATE_CHANGE,
                currentUser: getSnapshot.data()
            })
            : console.log('does not exist');
    })
}

export function fetchUserPosts() {
    const outDoc = doc(db, 'posts', auth.currentUser.uid)
    const innerDoc = collection(outDoc, 'userPosts');
    const orderby = query(innerDoc, orderBy('creation'))
    let posts;
    return (async (dispatch) => {
        const getSnapshot = await getDocs(orderby)
        !getSnapshot.empty ?
            posts = getSnapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            : console.log('does empty');
        dispatch({
            type: USER_POSTS_STATE_CHANGE,
            posts : posts
        })
    })
}

export function fetchUserFollowing() {
    const outDoc = doc(db, 'following', auth.currentUser.uid)
    const innerDoc = collection(outDoc, 'userFollowing');
    let following;
    return (async (dispatch) => {
        const onSnapshots = await onSnapshot(innerDoc)
        !onSnapshots.empty ?
            following = getSnapshot.docs.map(doc => {
                const id = doc.id;
                return { id }
            })
            : console.log('does empty');
        dispatch({
            type: USER_FOLLOWING_STATE_CHANGE,
            following : following
        })
    })
}

export function fetchUserData(uid) {
    const outDoc = doc(db, 'users', uid)
    return (async (dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if(!found){
            const getSnapshot = await getDoc(outDoc)

            if(getSnapshot.exists){
                let user = getSnapshot.data();
                user.uid = getSnapshot.id;
                dispatch({
                    type: USERS_DATA_STATE_CHANGE,
                    user
                })
            }
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    const outDoc = doc(db, 'posts', auth.currentUser.uid)
    const innerDoc = collection(outDoc, 'userPosts');
    const orderby = query(innerDoc, orderBy('creation'))
    let posts;
    return (async (dispatch) => {
        const getSnapshot = await getDocs(orderby)
        const uid = getSnapshot.query.EP.path.segments[1]
        !getSnapshot.empty ?
            posts = getSnapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            : console.log('does empty');
        dispatch({
            type: USER_POSTS_STATE_CHANGE,
            posts : posts
        })
    })
}