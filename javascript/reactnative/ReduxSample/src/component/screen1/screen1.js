import React, {Component} from 'react';
import {View, Text, Button} from 'react-native'

class Screen1 extends Component{
    render(){
        return(
            <View>
                <Text>scene1</Text>
                <Button title="Homeへ" onPress={()=>{this.props.navigation.navigate('HOME')}} />
                <Button title="S1追加" onPress={()=>{this.props.navigation.push('S1')}} />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="First stack"
                    onPress={() => this.props.navigation.popToTop()}
                />


            </View>

        )
    }
}

export default Screen1;