import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Initialize Firebase
var config = {
    apiKey: process.env.MIX_FIREBASE_apiKey,
    authDomain: process.env.MIX_FIREBASE_authDomain,
    databaseURL: process.env.MIX_FIREBASE_databaseURL,
    projectId: process.env.MIX_FIREBASE_projectId,
    storageBucket: process.env.MIX_FIREBASE_storageBucket,
    messagingSenderId: process.env.MIX_FIREBASE_messagingSenderId
};
firebase.initializeApp(config);
var messaging = firebase.messaging();


export default class Notification extends Component {

    constructor(props){
        super(props);
        this.state={
            notification_count : 0,
            notification_message: []
        };
    }

    componentDidMount(){
        const self = this;
        messaging.onMessage(function (payload) {
            self.handleMessage(payload);
        });
    }

    handleMessage(payload){
        this.setState({
            notification_count : this.state.notification_count+1,
        });
    }

    render() {
        return (
            <div>
                {this.state.notification_count}
            </div>
        );
    }
}


if (document.getElementById('app_notification')) {
    ReactDOM.render(<Notification />, document.getElementById('app_notification'));
}
