import React from 'react';

const todo_reducer = (state = {}, action) => {
    switch (action.type) {
        case 'ACTIVATE':
            return action.mystate;
        case 'CLOSE':
            return {};
        default:
            return state;
    }
};
export default todo_reducer;