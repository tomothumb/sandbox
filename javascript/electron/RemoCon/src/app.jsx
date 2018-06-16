import React from 'react';
import { CP_setting } from './component/setting'
import { CP_remocon } from './component/remocon'

export default class App extends React.Component {
  render() {
    return (<div>
        <CP_remocon />
        <CP_setting />
    </div>);
  }
}

