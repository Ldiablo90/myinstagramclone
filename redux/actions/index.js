import { USER_STATE_CHANGE } from '../constants'

import { fireAuth, fireStore } from '../../firebase'

const { getFirestore, doc, getDoc } = fireStore;
const { getAuth } = fireAuth;
const db = getFirestore();

export function fetchUser() {
    return (async (dispatch) => {
        const getSnapshot = await getDoc(doc(db,'users',getAuth().currentUser.uid))
        getSnapshot.exists?
                dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: getSnapshot.data()
                })
                :
        console.log('does not exist');
    })
}