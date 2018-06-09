import React,{Component} from "react";
import {AsyncStorage,TouchableOpacity,Button, Text,View} from "react-native";



const sendSignal = (signal,token) => {
    fetch('https://api.nature.global/1/signals/'+signal+'/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ token
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("success");
            console.log(response);
        })
        .catch((error) => {
            console.log("error");
            console.error(error);
        });
};

class CP_Signal extends Component {
    constructor(props){
        super(props);
    }

    handlePress(){
        sendSignal(this.props.signal.id,this.props.token);
    }
    render (){
        return (
            <View>
                <Button
                    title={this.props.signal.name}
                    onPress={this.handlePress.bind(this)}
                />
            </View>
        );
    }
}

const Appliances = ({item,token}) => {
    return (
        <View>
            <Text>{item.nickname}</Text>
            { item.signals.map((signal,idx) => {
                return (
                    <CP_Signal signal={signal} key={idx} token={token} />
                )
            }) }
        </View>
    )
};

export class CP_remocon extends Component{
    constructor(props){
        super(props);
        this.state = {
            access_token: "",
            devices: {
                name:"",
                id:""
            },
            appliances:[]
        };
    }

    fetchDevices(){
        fetch('https://api.nature.global/1/devices', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ this.state.access_token
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log("success");
                this.setState({devices:{
                        id: response[0].id,
                        name: response[0].name
                    }})
            })
            .catch((error) => {
                console.log("error");
                console.error(error);
            });
    }
    fetchAppliances(){
        fetch('https://api.nature.global/1/appliances', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ this.state.access_token
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log("success");
                this.setState({appliances:response})
            })
            .catch((error) => {
                console.log("error");
                console.error(error);
            });
    }

    componentWillMount(){
        AsyncStorage.getItem('access_token')
            .then((data) => {
                if(data){
                    this.setState({ access_token:data });
                    this.fetchDevices();
                }
            });
    }
    enterDevice(){
        console.log(this.state.devices.id);
        this.fetchAppliances();
    }
    render(){
        return(
            <View>
                <TouchableOpacity>
                    <Button title={this.state.devices.name} onPress={this.enterDevice.bind(this)} />
                </TouchableOpacity>
                {this.state.appliances.map((item,idx)=>{
                    return (
                        <Appliances key={idx} item={item} token={this.state.access_token} />
                    );
                })}
            </View>
        )
    }
}
