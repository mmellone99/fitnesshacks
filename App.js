import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

//import * as firebase from 'firebase'
import firebase from 'firebase/app'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store= createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBqCgMXMb9xN1gwEFVskFUi9ufHAhSAMyw",
  authDomain: "fitnesshacks-cbc1b.firebaseapp.com",
  projectId: "fitnesshacks-cbc1b",
  storageBucket: "fitnesshacks-cbc1b.appspot.com",
  messagingSenderId: "342918978091",
  appId: "1:342918978091:web:d04135e4bc657925a2e86e",
  measurementId: "G-YYPJ1RPYSM"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen, { Main } from './components/Main'

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const{ loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name = "Landing" component={LandingScreen} options={{headerShown: false}}/>
          <Stack.Screen name = "Register" component={RegisterScreen} />
          <Stack.Screen name = "Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      );
    }

    return(
      <Provider store = {store}>
        <MainScreen/>
      </Provider>
      
    )
    
  }
}

export default App



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
