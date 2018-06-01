import React from 'react';

export const activateKabaya = kabaya => ({
    type: 'ACTIVATE_KABAYA',
    kabaya,
});

export const closeKabaya = () => ({
    type: 'CLOSE_KABAYA',
});
