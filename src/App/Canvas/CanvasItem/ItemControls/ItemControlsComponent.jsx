import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import './ItemControlsStyles';

function ItemControlsComponent(props) {
    const { itemState, setItemState } = props;
    const [isResizing, setIsResizing] = useState(false);
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });

    const handleBotRightResize = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsResizing(true);
    };

    /**
     * Adds and removes an event listener for a mousemove event based on if the item is being
     * dragged or not.
     */
    useEffect(() => {
        const handleMouseMove = (event) => {
            const itemBox = itemState.ref.current.getBoundingClientRect();

            event.preventDefault();

            if (isResizing) {
                setItemState((currentItemState) => ({
                    ...currentItemState,
                    width: event.clientX - itemBox.left,
                    height: event.clientY - itemBox.top,
                }));
            }
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isResizing]);

    /**
     * Adds and removes an event listener for a mouseup event based on if the item is being
     * dragged or not.
     */
    useEffect(() => {
        const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        if (isResizing) {
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isResizing]);

    return (
        <div className={cn('ItemControls')}>
            <div className="ItemControls-knob ItemControls-knob--top ItemControls-knob--left" />
            <div className="ItemControls-knob ItemControls-knob--top ItemControls-knob--right" />
            <div className="ItemControls-knob ItemControls-knob--bot ItemControls-knob--left" />
            <div
                className="ItemControls-knob ItemControls-knob--bot ItemControls-knob--right"
                onMouseDown={handleBotRightResize}
            />
        </div>
    );
}
export default ItemControlsComponent;
