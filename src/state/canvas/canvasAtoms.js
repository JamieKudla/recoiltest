import { createRef } from 'react';
import { map, memoize } from 'lodash-es';
import { atom, selector } from 'recoil';

export const defaultItemState = {
    id: null,
    name: '',
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    fill: '#FFFFFF',
    stroke: '#FFFFFF',
    strokeWidth: 0,
    ref: null,
}

export const itemWithID = memoize((id) => atom({
    key: `item-${id}`,
    default: {
        ...defaultItemState,
        id,
        ref: createRef(),
    },
}));

export const selectedItems = atom({
    key: 'selectedItems',
    default: new Set(),
});

export const selectedItemsStates = selector({
    key: 'selectedItemsStates',
    get: ({ get }) => {
        const items = get(selectedItems);
        const itemStates = map([...items], (itemID) => {
            return get(itemWithID(itemID));
        });

        return itemStates;
    }
});
