import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { itemWithID } from '../../../state/canvas/canvasAtoms';

import './itemInfoStyles';

function ItemInfoComponent(props) {
    const { itemID } = props;
    const [itemState, setItemState] = useRecoilState(itemWithID(itemID));

    const handleFillColorChange = (event) => {
        setItemState((currentState) => ({ ...currentState, fill: event.target.value }));
    };

    const handleStrokeColorChange = (event) => {
        setItemState((currentState) => ({ ...currentState, stroke: event.target.value }));
    };

    const handleStrokeWidthChange = (event) => {
        setItemState((currentState) => ({ ...currentState, strokeWidth: event.target.value }));
    };

    return (
        <div
            key={itemID}
            className="ItemInfo"
        >
            <div className="ItemInfo-section">
                <div className="ItemInfo-row">
                    <div className="ItemInfo-sectionName">Info</div>
                </div>
                <div className="ItemInfo-row">
                    <label className="ItemInfo-stat ItemInfo-stat--single">
                        <span className="ItemInfo-statLabel">X</span>
                        {itemState.x}
                    </label>
                    <label className="ItemInfo-stat ItemInfo-stat--single">
                        <span className="ItemInfo-statLabel">Y</span>
                        {itemState.y}
                    </label>
                </div>
                <div className="ItemInfo-row">
                    <label className="ItemInfo-stat ItemInfo-stat--single">
                        <span className="ItemInfo-statLabel">W</span>
                        {itemState.width}
                    </label>
                    <label className="ItemInfo-stat ItemInfo-stat--single">
                        <span className="ItemInfo-statLabel">H</span>
                        {itemState.height}
                    </label>
                </div>
            </div>
            <div className="ItemInfo-section">
                <div className="ItemInfo-row">
                    <div className="ItemInfo-sectionName">Fill</div>
                </div>
                <div className="ItemInfo-row">
                    <label className="ItemInfo-stat ItemInfo-stat--swatch">
                        <input
                            type="color"
                            className="ColorPicker"
                            onChange={handleFillColorChange}
                            value={itemState.fill}
                        />
                        {itemState.fill}
                    </label>
                </div>
            </div>
            <div className="ItemInfo-section">
                <div className="ItemInfo-row">
                    <div className="ItemInfo-sectionName">Stroke</div>
                </div>
                <div className="ItemInfo-row">
                    <label className="ItemInfo-stat ItemInfo-stat--swatch">
                        <input
                            type="color"
                            className="ColorPicker"
                            onChange={handleStrokeColorChange}
                            value={itemState.stroke}
                        />
                        {itemState.stroke}
                    </label>
                    <label className="ItemInfo-stat ItemInfo-stat--strokeWidth">
                        <input
                            type="number"
                            onChange={handleStrokeWidthChange}
                            value={itemState.strokeWidth}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

ItemInfoComponent.propTypes = {
    itemID: PropTypes.any,
}

export default ItemInfoComponent;
