import React,{Component} from 'react';

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
            <div>
                <button onClick={this.handlePress.bind(this)}
                >{this.props.signal.name}</button>
            </div>
        );
    }
}

const Appliances = ({item,token}) => {
    return (
        <div>
            <p>{item.nickname}</p>
            { item.signals.map((signal,idx) => {
                return (
                    <CP_Signal signal={signal} key={idx} token={token} />
                )
            }) }
        </div>
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

    fetchDevices(access_token){
        fetch('https://api.nature.global/1/devices', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ access_token
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
        const data = localStorage.getItem('access_token');
        if(data){
            this.setState({ access_token:data });
            this.fetchDevices(data);
        }
    }
    enterDevice(){
        this.fetchAppliances();
    }
    render(){
        return(
            <div>
                <p>{this.state.devices.name}</p>
                <button onClick={this.enterDevice.bind(this)} >Enter</button>
                {this.state.appliances.map((item,idx)=>{
                    return (
                        <Appliances key={idx} item={item} token={this.state.access_token} />
                    );
                })}
            </div>
        )
    }
}
