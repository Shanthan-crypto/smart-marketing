import * as firebase from "firebase";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import AnalysisScreen from './screens/Analysis';
import DashboardScreen from "./screens/Dashboard";
import HomeScreen from "./screens/HomeScreen";
import Load from "./Load";
import LoadingScreen from "./screens/LoadingScreen";
import MySurveysScreen from "./screens/MyServeys";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "./screens/Profile";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { StatusBar } from "expo-status-bar";
import {createDrawerNavigator} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

var firebaseConfig = {
  apiKey: "AIzaSyAirGgcqM4aHf-WEW8GaeTNfBjZreFMFiw",
  authDomain: "feedback-app-e041d.firebaseapp.com",
  databaseURL: "https://feedback-app-e041d.firebaseio.com",
  projectId: "feedback-app-e041d",
  storageBucket: "feedback-app-e041d.appspot.com",
  messagingSenderId: "569449366174",
  appId: "1:569449366174:web:7819849c5a59682035f18f",
  measurementId: "G-WTBTX56S2K",
};
firebase.initializeApp(firebaseConfig);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerNavigation(){
  return(
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{title:"Home",headerShown:true,headerStyle: {
              backgroundColor: "#EA7773",
            }}}/>
        <Drawer.Screen name="Profile" component={ProfileScreen}/>
        <Drawer.Screen name="MySurveys" component={MySurveysScreen} options={{title:"My Surveys",headerShown:true,headerStyle: {
              backgroundColor: "#EA7773",
            }}}/>
        <Drawer.Screen name="Analysis" component={DashboardScreen} options={{title:"Analysis",headerShown:true,headerStyle: {
              backgroundColor: "#EA7773",
            }}}/>
    </Drawer.Navigator>
  )
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoadingScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#EA7773",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
            },
          }}
        >
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{
              title: "Loading",
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={DrawerNavigation}
            options={{
              //title: "Home",
              headerShown:false
            }}
          />
          <Stack.Screen
            name="AnalysisScreen"
            component={AnalysisScreen}
            options={{
              title: "Analysis",
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              title: "Sign Up",
            }}
          />
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{
              title: "Sign In",
            }}
          />
          <Stack.Screen
            name="Load"
            component={Load}
            options={{
              title: "Loading",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
