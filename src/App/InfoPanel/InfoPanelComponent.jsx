import React from 'react';
import { map } from 'lodash-es';
import { useRecoilValue } from 'recoil';

import { selectedItems } from '../../state/canvas/canvasAtoms';

import './infoPanelStyles';
import ItemInfoComponent from './ItemInfo/ItemInfoComponent';

function InfoPanelComponent() {
    const selectedItemIDs = useRecoilValue(selectedItems);

    return (
        <div className="InfoPanel">
            {map([...selectedItemIDs], (itemID) => (
                <ItemInfoComponent
                    key={itemID}
                    itemID={itemID}
                />
            ))}
        </div>
    );
}

export default InfoPanelComponent;
