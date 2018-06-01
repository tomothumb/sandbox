import React from 'react';
import { createStore } from 'redux';
import {combineReducers} from "redux/index";

import btn_reducer from "./btn_reducer";
import todo_reducer from "./todo_reducer";


const reducers = combineReducers({
    btn_reducer,
    todo_reducer,
});

function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();