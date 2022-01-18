import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, NavigationContainer } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import rootReduser from './redux/reducers';
import AuthScreen from './screens/AuthScreen';
import MainScreen from './screens/MainScreen';
import AddFeedScreen from './screens/AddFeedScreen';
import { fireAuth } from './firebase';


const store = createStore(rootReduser, applyMiddleware(thunk))

const { onAuthStateChanged, getAuth } = fireAuth

export default function App() {

  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const Stack = createNativeStackNavigator();
  const screenOption = {
    headerShown: false
  }


  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setLoaded(true)
      user ? setLoggedIn(true) : setLoggedIn(false)
    })
  }, [])

  if (!loaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading</Text>
      </View>
    )
  } else {
    if (!loggedIn) {
      return (
        <View style={styles.container}><AuthScreen /></View>
      )
    }
    else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='MainScreen' screenOptions={screenOption}>
              <Stack.Screen name='MainScreen' component={MainScreen}/>
              <Stack.Screen name='AddFeedScreen' component={AddFeedScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})