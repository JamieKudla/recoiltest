import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { v4 as uuidv4} from 'uuid';

import { searchQuery } from '../../state/search/searchAtoms';

import './toolbarStyles';

function ToolbarComponent(props) {
    const { itemIDs, setItemIDs } = props;
    const [query, setQuery] = useRecoilState(searchQuery)

    const handleCreateRect = () => {
        const newItemID = uuidv4();

        setItemIDs([...itemIDs, newItemID]);
    }

    const handleInput = (event) => {
        setQuery(event.target.value);
    }

    return (
        <div className="Toolbar">
            <button
                className="Toolbar-button"
                type="button"
                onClick={handleCreateRect}
            >
                R
            </button>
            <input type="text" onInput={handleInput} value={query} />
        </div>
    );
}

ToolbarComponent.propTypes = {
    itemIDs: PropTypes.arrayOf(PropTypes.string),
    setItemIDs: PropTypes.func,
}

export default ToolbarComponent;
