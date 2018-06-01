import React from 'react';
import {combineReducers} from "redux";

const btnreducer = (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVATE':
            return action.mystate;
        case 'CLOSE':
            return {};
        default:
            return state;
    }
};

export const reducers = combineReducers({
    btnreducer,
});
