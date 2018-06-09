import React from 'react';
import { CP_setting } from './component/setting'
import { CP_remocon } from './component/remocon'

export default class App extends React.Component {
  render() {
    return (<div>
      <h2>Welcome to Re2asct!2</h2>
        <CP_setting />
        <CP_remocon />
    </div>);
  }
}

