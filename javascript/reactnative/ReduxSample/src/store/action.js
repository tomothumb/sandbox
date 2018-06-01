import React from 'react';
import {ADD_TODO,
    TOGGLE_TODO,
    REMOVE_TODO,
    SET_VISIBILITY_FILTER} from './action_type'

export const action_activate = mystate => ({
    type: 'ACTIVATE',
    mystate,
});

export const action_close = () => ({
    type: 'CLOSE',
});


let nextTodoId = 0;

export const add_todo = text => {
    return{
        type:'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}