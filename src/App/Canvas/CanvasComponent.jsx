import React, { createRef, useEffect, useState, useRef, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { each, get } from 'lodash-es';

import { selectedItems } from '../../state/canvas/canvasAtoms';

import CanvasItem from './CanvasItem/CanvasItemComponent';

import './canvasStyles';

function CanvasComponent(props) {
    const { itemIDs } = props;
    const [refMap, setRefMap] = useState({});
    const canvasRef = useRef();
    const [selectedItemIDs, setSelectedItemIDs] = useRecoilState(selectedItems);

    const handleMouseDown = useCallback((event) => {
        const alreadySelected = selectedItemIDs.has(clickedItemID);
        let clickedItemID;
        let updatedSelection;
        const lol = (nodeToCheck) => {
            if (get(nodeToCheck, 'dataset.itemid')) {
                return nodeToCheck.dataset.itemid;
            }

            if (nodeToCheck.parentNode) {
                return lol(nodeToCheck.parentNode);
            }
        }

        clickedItemID = lol(event.target);

        // // Handle Multiselect (TODO: break out)
        // if (event.shiftKey) {
        //     // New selection should include the current selection.
        //     updatedSelection = new Set([...selectedItemIDs]);

        //     if (clickedItemID) {
        //         if (!alreadySelected) {
        //             updatedSelection.add(clickedItemID);
        //         }

        //         setSelectedItemIDs(updatedSelection);
        //     }

        //     return;
        // }

        // Handle Regular Select (TODO: break out)
        updatedSelection = new Set();

        if (clickedItemID) {
            // The clicked DOM node is a canvas item.
            if (alreadySelected) {
                // This canvas item is already selected.
                return;
            }

            // Add item to the list of seleted item IDs
            updatedSelection.add(clickedItemID);
        }

        setSelectedItemIDs(updatedSelection);
    }, [selectedItemIDs]);

    useEffect(() => {
        canvasRef.current.addEventListener('mousedown', handleMouseDown);

        return () => {
            canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        }
    }, [handleMouseDown]);

    useEffect(() => {
        // Update the refMap if there is a change in itemIDs
        setRefMap((currentRefMap) => {
            const newRefMap = {};

            each(itemIDs, (id) => {
                if (id in currentRefMap) {
                    // Copy the ref to the new object if it already exists.
                    newRefMap[id] = currentRefMap[id];

                    return;
                }

                // Create a new ref for this ID since there wasn't one before.
                refMap[id] = createRef();
            });

            return newRefMap;
        });
    }, [itemIDs]);

    const renderCanvasItems = () => {
        return itemIDs.map((id) => (
            <CanvasItem
                key={id}
                itemID={id}
                isSelected={selectedItemIDs.has(id)}
                ref={refMap[id]}
            />
        ));
    }

    return (
        <div
            className="Canvas"
            ref={canvasRef}
        >
            {renderCanvasItems()}
        </div>
    );
}

CanvasComponent.propTypes = {
    itemIDs: PropTypes.arrayOf(PropTypes.string),
}

export default CanvasComponent;
