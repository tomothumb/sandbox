import React from 'react';
import { createStore } from 'redux';
import {combineReducers} from "redux";
import {btn_reducer} from "./btn/btn_reducer";
import {todo_reducer} from "./todo/todo_reducer";


const reducers = combineReducers({
    btn_reducer,
    todo_reducer
});

function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();