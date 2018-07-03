import React from 'react';
import { CP_setting } from './component/setting'
import { CP_remocon } from './component/remocon'
import {Tabbar} from "./component/tabbar";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tab: "setting",
        };
    }
    handleTab(value){
        this.setState({ tab: value });
    }

    render() {
        let mycontent = <p style={{color:"white"}}>NO CONTENT</p>
        console.log(1);
        if (this.state.tab == 'setting'){
            console.log(2);
            mycontent = <CP_setting />;
        }else{
            console.log(3);
            mycontent = <CP_remocon />;
        }
        return (
            <div style={{paddingBottom:"50px"}}>
                {mycontent}
                <Tabbar handleTab={this.handleTab} />
            </div>
        );
  }
}

