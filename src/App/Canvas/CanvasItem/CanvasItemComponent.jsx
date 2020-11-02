import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import cn from 'classnames';

import './canvasItemStyles';

import { itemWithID } from '../../../state/canvas/canvasAtoms';
import ItemControls from './ItemControls/ItemControlsComponent';

function CanvasItemComponent(props) {
    const { itemID, isSelected } = props;
    const [itemState, setItemState] = useRecoilState(itemWithID(itemID));
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    /**
     * Handles a mousedown event on this item.
     */
    const handleMouseDown = useCallback((event) => {
        const itemBox = itemState.ref.current.getBoundingClientRect();
        setIsDragging(true);

        // setItemState((currentItemState) => {
        //     if (currentItemState.isSelected) {
        //         return currentItemState;
        //     }

        //     return {
        //         ...currentItemState,
        //         isSelected: true,
        //     }
        // });


        setDragOffset({
            x: itemBox.left - event.clientX,
            y: itemBox.top - event.clientY,
        });
    }, []);

    /**
     * Adds and removes an event listener for a mousemove event based on if the item is being
     * dragged or not.
     */
    useEffect(() => {
        const handleMouseMove = (event) => {
            event.preventDefault();

            if (isDragging) {
                setItemState((currentItemState) => ({
                    ...currentItemState,
                    x: dragOffset.x + event.clientX,
                    y: dragOffset.y + event.clientY,
                }));
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isDragging, dragOffset]);

    /**
     * Adds and removes an event listener for a mouseup event based on if the item is being
     * dragged or not.
     */
    useEffect(() => {
        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        if (isDragging) {
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging]);

    return (
        <div
            className={cn('CanvasItem', { isSelected })}
            data-itemid={itemID}
            style={{
                transform: `translate(${itemState.x}px, ${itemState.y}px)`,
                width: `${itemState.width}px`,
                height: `${itemState.height}px`,
                backgroundColor: itemState.fill,
                boxShadow: `inset 0 0 0 ${itemState.strokeWidth}px ${itemState.stroke}${isSelected ? `, 0 0 0 2px var(--purple)`: ''}`,
            }}
            ref={itemState.ref}
            onMouseDown={handleMouseDown}
        >
            {isSelected && <ItemControls itemState={itemState} setItemState={setItemState} />}
            {itemState.name}
        </div>
    );
}

CanvasItemComponent.propTypes = {
    itemID: PropTypes.string,
}

export default CanvasItemComponent;
