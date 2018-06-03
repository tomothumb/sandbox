import React from 'react';

export const btn_reducer = (state = {}, action) => {
    switch (action.type) {
        case 'BTN_ACTIVATE':
            return action.mystate;
        case 'BTN_CLOSE':
            return {};
        default:
            return state;
    }
};