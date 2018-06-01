// home.js
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import { connect } from 'react-redux';
import { activateKabaya, closeKabaya } from '../Store/Action';

export class Home extends Component {
    render() {
        return (
            <View>
                <Text style={{marginTop: 200}}>{this.props.kabaya.title || '成功!'}</Text>
                {this.props.kabaya.title ?
                    <Button
                        onPress={this.props.closeKabaya}
                        title="Click me"
                        color="#841584"
                    /> :
                    <Button
                        onPress={() => this.props.activateKabaya({ title: '私の名前はカバヤです' })}
                        title="Click me"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    // storeは巨大なJsonの塊なので、kabayaにjsonから取って来たデータを代入している。
    kabaya: state.kabaya,
});

const mapDispatchToProps = {
    // action creatorの名前が入っている。
    activateKabaya,
    closeKabaya,
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
});
