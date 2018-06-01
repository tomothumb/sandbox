import React from 'react';
import {combineReducers} from "redux";


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
