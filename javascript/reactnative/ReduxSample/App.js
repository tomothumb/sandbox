import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import {RootStack} from './src/route/route';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        );
    }
}
