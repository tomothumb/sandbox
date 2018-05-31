import React, {Component} from 'react';
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';

// actions.js
export const activateKabaya = kabaya => ({
    type: 'ACTIVATE_KABAYA',
    kabaya,
});

export const closeKabaya = () => ({
    type: 'CLOSE_KABAYA',
});

// reducers.js
export const kabaya = (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVATE_KABAYA':
            return action.kabaya;
        case 'CLOSE_KABAYA':
            return {};
        default:
            return state;
    }
};

export const reducers = combineReducers({
    kabaya,
});

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();