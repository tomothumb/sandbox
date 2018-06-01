import React from 'react';
import { createStore } from 'redux';
import { reducers } from "./Reducer";

function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();