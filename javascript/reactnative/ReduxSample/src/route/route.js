import React from 'react';
import { createStackNavigator } from 'react-navigation'
import HomeScreen from "../component/home"
import Screen1 from "../component/screen1/screen1"

export const RootStack = createStackNavigator(
    {
        HOME: {
            screen: HomeScreen,
        },
        S1: {
            screen: Screen1,
        }
    },{
        initialRouteName: 'HOME'
    }
);
