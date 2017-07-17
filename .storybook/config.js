import {
    configure
}
from '@storybook/react';

const req = require.context('../src/components', true, /\.cmp\.js$/)

function loadStories() {
    require('../stories/index.js');
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
