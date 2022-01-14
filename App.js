import { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReduser from './redux/reducers';
import AuthScreen from './screens/AuthScreen';
import MainScreen from './screens/MainScreen'

import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBtm0NpZe66Xmtk3ABA_QshKggcuJpFhZg",
  authDomain: "myinstagramclone-7a555.firebaseapp.com",
  projectId: "myinstagramclone-7a555",
  storageBucket: "myinstagramclone-7a555.appspot.com",
  messagingSenderId: "37463484354",
  appId: "1:37463484354:web:25e533ab29beca697ad85b",
  measurementId: "G-X790V9SR55"
};

const store = createStore(rootReduser, applyMiddleware(thunk))

getApps.length === 0 ? initializeApp(firebaseConfig) : '';

export default function App() {

  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setLoaded(true)
      user ? setLoggedIn(true) : setLoggedIn(false)
    })
  }, [])

  if (!loaded) {
    return (<View style={[styles.container,{justifyContent:'center',alignItems:'center'}]}><Text>Loading</Text></View>)
  } else {
    if (!loggedIn) { return (<View style={styles.container}><AuthScreen /></View>) }
    else { return (<Provider store={store}><MainScreen /></Provider>) }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})