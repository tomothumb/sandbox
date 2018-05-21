import React,{Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';


// @continue https://facebook.github.io/react-native/docs/flexbox.html
export default class Bananas extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <Text>aaaas234</Text>
                <Image source={pic} style={{width: 193, height: 110}}/>
                <Greeting name='Rexxar'/>
                <Greeting name='Jaina'/>
                <Greeting name='Valeera'/>
                <Blink text='I love to blink' />
            </View>
        );
    }
}

class Greeting extends Component {
    render() {
        return (
            <View>
            <Text style={styles.color_red}>Hello {this.props.name}</Text>
            <Text style={[styles.color_red, styles.big_blue]}>Hello {this.props.name}</Text>
            <Text style={[styles.big_blue, styles.color_red]}>Hello {this.props.name}</Text>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{width:40, height:40, backgroundColor:'red'}}></View>
                    <View style={{width:100, height:100, backgroundColor:'green'}}></View>
                </View>
            </View>
        )
    }
}

class Blink extends Component{
    constructor(props){
        super(props);
        this.state = {isShowingText: true};

        setInterval(()=>{
            this.setState(previousState =>{
                return {  isShowingText: !previousState.isShowingText };
            });
        },3000);
    }

    render(){
        let display = this.state.isShowingText ? this.props.text : ' ';
        return (
            <Text>{display}</Text>

        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    color_red: {
        color: '#CC0000'
    },
    big_blue: {
        fontWeight:'bold',
        fontSize:24,
        color: '#0000CC'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => Bananas)