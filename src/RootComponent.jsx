import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';

import App from './App/AppComponent';

function RootComponent() {
    return (
        <StrictMode>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </StrictMode>
    )
}

export default RootComponent;
