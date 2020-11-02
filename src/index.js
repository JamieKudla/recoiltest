import React from 'react';
import { render } from 'react-dom';

import Root from './RootComponent';
import './assets/styles/global';

const appRoot = document.getElementById('appRoot');

render(<Root />, appRoot);
