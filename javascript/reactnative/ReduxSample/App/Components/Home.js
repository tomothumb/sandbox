// home.js
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import { connect } from 'react-redux';
import { action_activate, action_close } from '../Store/Action';
import {btnreducer, myreducer} from "../Store/Reducer";

export class Home extends Component {
    render() {
        return (
            <View>
                <Text style={styles.text}>{this.props.btnstate.title || '未設定'}</Text>
                {this.props.btnstate.title ?
                    <Button
                        onPress={this.props.action_close}
                        title="Reset"
                        style={styles.button}
                    /> :
                    <Button
                        onPress={() => this.props.action_activate({ title: 'アクティブです' })}
                        title="Set Active"
                        style={styles.button}
                        accessibilityLabel="Learn more about this purple button"
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    btnstate: state.btnreducer,
});

const mapDispatchToProps = {
    action_activate,
    action_close,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default Container;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        marginTop: 200
    },
    button:{
        color:"#841584"
    }
});
