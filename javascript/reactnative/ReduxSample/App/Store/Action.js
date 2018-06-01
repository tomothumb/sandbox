import React from 'react';

export const action_activate = mystate => ({
    type: 'ACTIVATE',
    mystate,
});

export const action_close = () => ({
    type: 'CLOSE',
});
