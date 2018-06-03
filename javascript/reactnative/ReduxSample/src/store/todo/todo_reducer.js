import React from 'react';
import {combineReducers} from "redux";

import {
    ADD_TODO,
    COMPLETE_TODO,
    REMOVE_TODO,
    SET_VISIBILITY_FILTER,
} from '../action/action_type'
import {VisibilityFilters} from './action'

const {SHOW_ALL} = VisibilityFilters;

const items = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case COMPLETE_TODO:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];
        case REMOVE_TODO:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
};

const visibility_filter = (state = {}, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export const todo_reducer = combineReducers({
    items,
    visibility_filter
});