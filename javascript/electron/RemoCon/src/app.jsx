import React from 'react';
import { CP_setting } from './component/setting'
import { CP_remocon } from './component/remocon'
import {Tabbar} from "./component/tabbar";

export default class App extends React.Component {
  render() {
    return (<div style={{paddingBottom:"50px"}}>
        <CP_remocon />
        <CP_setting />
        <Tabbar />
    </div>);
  }
}

