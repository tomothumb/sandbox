import React from 'react';
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import {reducers} from "./Reducer";

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();