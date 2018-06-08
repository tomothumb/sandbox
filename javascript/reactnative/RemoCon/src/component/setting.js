import React, { Component } from 'react';
import {View, Text, Button, TextInput, AsyncStorage,
  TouchableOpacity
} from 'react-native';

export class CP_setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      text_input: "",
      access_token : null
    };
  }
  componentWillMount(){
    AsyncStorage.getItem('access_token')
      .then((data) => {
        if(data){
          this.setState({access_token:data});
        }
      });
  }
  setAccessToken(){
      AsyncStorage.setItem('access_token',this.state.text_input);
    this.setState({ access_token: this.state.text_input });
    this.setState({ text_input: "" });
  }
  handleInput(e){
      this.setState({ text_input: e });
  }

  render(){
    let access_token = (this.state.access_token != "")
        ? <Text>{this.state.access_token}</Text>
        : null;

    return(
      <View>
        <Text>ACCESS TOKEN:</Text>
        {access_token}
          <TextInput
              onChangeText={(e)=>{this.handleInput(e);}}
              value={this.state.text_input}
              placeholder='>note'
              style={{color:'red',borderBottomColor:'black',borderBottomWidth:1}}
              placeholderTextColor='green'
              underlineColorAndroid='transparent'
          />
          <TouchableOpacity>
            <Button title="save" onPress={this.setAccessToken.bind(this)} />
          </TouchableOpacity>
      </View>

    )
  }
}

