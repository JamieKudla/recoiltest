import React, { useState } from 'react';

import Canvas from './Canvas/CanvasComponent';
import Toolbar from './Toolbar/ToolbarComponent';
import InfoPanel from './InfoPanel/InfoPanelComponent'
import './appStyles';

function AppComponent() {
    const [itemIDs, setItemIDs] = useState([]);

    return (
        <div className="App">
            <Toolbar itemIDs={itemIDs} setItemIDs={setItemIDs} />
            <Canvas itemIDs={itemIDs} setItemIDs={setItemIDs} />
            <InfoPanel />
        </div>
    );
}

export default AppComponent;
