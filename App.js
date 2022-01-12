import { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import AuthScreen from './screens/AuthScreen';

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth' 

const firebaseConfig = {
  apiKey: "AIzaSyBtm0NpZe66Xmtk3ABA_QshKggcuJpFhZg",
  authDomain: "myinstagramclone-7a555.firebaseapp.com",
  projectId: "myinstagramclone-7a555",
  storageBucket: "myinstagramclone-7a555.appspot.com",
  messagingSenderId: "37463484354",
  appId: "1:37463484354:web:25e533ab29beca697ad85b",
  measurementId: "G-X790V9SR55"
};

getApps.length === 0 ? initializeApp(firebaseConfig):'';



export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const useHandler = user => user?setCurrentUser(user):setCurrentUser(null)
  useEffect(() => {getAuth().onAuthStateChanged( user => useHandler(user))}, [])
  return (
    <View style={styles.container}>
      { currentUser ? <Text>Login Sucsesse</Text> : <AuthScreen />  }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})