import React from 'react';

const btn_reducer = (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVATE':
            return action.mystate;
        case 'CLOSE':
            return {};
        default:
            return state;
    }
};
export default btn_reducer;