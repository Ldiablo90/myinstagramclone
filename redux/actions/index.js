import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../constants'

import { fireAuth, fireStore } from '../../firebase'

const { getFirestore, doc, getDoc, getDocs, collection, orderBy, query } = fireStore;
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