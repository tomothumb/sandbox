import React from 'react';
import {ADD_TODO,
    COMPLETE_TODO,
    REMOVE_TODO,
    SET_VISIBILITY_FILTER
} from '../action/action_type'


/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export function addTodo(text){
    return {
        type: ADD_TODO,
        text
    }
}
export function completeTodo(index){
    return {
        type: COMPLETE_TODO,
        index
    }
}
export function removeTodo(index){
    return {
        type: REMOVE_TODO,
        index
    }
}
export function setVisibilityFilter(filter){
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}

