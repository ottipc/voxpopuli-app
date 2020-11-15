import React,{useState, Component} from "react";
import { Text } from "react-native";
import styles from "./assets/styles";
import HomeScreen from "./containers/Home";
import LoginScreen from "./containers/Login";
import RegistrationScreen from "./containers/Registration";
import ProfileScreen from "./containers/Profile";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Icon from "./components/Icon";
import { YellowBox } from 'react-native';
import Registration from "./containers/Registration";
YellowBox.ignoreWarnings(['Setting a timer']);

const navigator = createStackNavigator(
    {
        Home: HomeScreen,
        Login:LoginScreen,
      Registration: RegistrationScreen,
      Profile: ProfileScreen,
    },
    {
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#000',
        },
      },
    }
);

const App = createAppContainer(navigator);
export default App;
