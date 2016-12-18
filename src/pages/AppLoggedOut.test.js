import React from 'react';
import ReactDOM from 'react-dom';
import AppLoggedOut from './AppLoggedOut';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppLoggedOut />, div);
});
