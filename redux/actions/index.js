import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from '../constants'

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
            dispatch({ type: USER_STATE_CHANGE, currentUser: getSnapshot.data() })
            : console.log('does not exist');
    })
}

export function fetchUserPosts() {
    const outDoc = doc(db, 'posts', auth.currentUser.uid)
    const innerDoc = collection(outDoc, 'userPosts');
    const orderby = query(innerDoc, orderBy('creation'))
    
    return (async (dispatch) => {
        const getSnapshot = await getDocs(orderby)
        
        let posts = getSnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
        })
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts: posts })
    })
}

export function fetchUserFollowing() {
    const outDoc = doc(db, 'following', auth.currentUser.uid)
    const innerDoc = collection(outDoc, 'userFollowing');
    const querys = query(innerDoc)
    return ((dispatch) => {
        onSnapshot(querys, (snapshot) => {
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return { id }
            })
            dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following: following })
            following.forEach( follow => {
                if(follow ===  undefined){
                    console.log("undefined")
                }else{
                    dispatch(fetchUsersData(follow.id))
                }
            })
        })
    })
}

export function fetchUsersData(uid) {
    const outDoc = doc(db, 'users', uid)
    return (async (dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if(!found){
            const getSnapshot = await getDoc(outDoc)
            
            if(getSnapshot.exists()){
                let user = getSnapshot.data();
                user.uid = getSnapshot.id;
                dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                dispatch(fetchUsersFollowingPosts(user.uid));
            }
        }
    })
}

export function fetchUsersFollowingPosts(uid) {
    const outDoc = doc(db, 'posts', uid)
    const innerDoc = collection(outDoc, 'userPosts');
    const orderby = query(innerDoc, orderBy('creation'))
    return (async (dispatch, getState) => {
        const getSnapshot = await getDocs(orderby)
        const uid = getSnapshot.query._query.path.segments[1]
        const user = getState().usersState.users.find(el => el.uid === uid );

        let posts = getSnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data, user }
        })
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })

    })
}