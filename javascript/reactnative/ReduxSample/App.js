import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { store } from './App/Store/Store';
import Home from './App/Components/Home';

// https://qiita.com/loverails/items/8c46767413a3c8d15f00
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    }
}
