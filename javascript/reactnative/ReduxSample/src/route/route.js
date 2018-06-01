import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation'
import {btnreducer, myreducer} from "../store/btn_reducer";
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
        initialRouteName: 'S1'
    }
);
