import { useState } from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import Table from './Table';

// "content on screen changes" -> state!
function getIcons(label, sortBy, sortOrder) {
    if (label !== sortBy) {
        return (
        <div>
            <TiArrowSortedUp  />
            <TiArrowSortedDown  />
        </div>
        );
    }

    if (sortOrder === null) {
        return (
        <div>
            <TiArrowSortedUp  />
            <TiArrowSortedDown  />
        </div>
        );
    } else if (sortOrder === 'asc') {
        return (
        <div>
            <TiArrowSortedUp  />
        </div>
        );
    } else if (sortOrder === 'desc') {
        return (
        <div>
            <TiArrowSortedDown  />
        </div>
        );
    }
}

function SortableTable(props) {

    const {config, data} = props;
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    const handleClick = (label) => {
        if(sortBy && label !== sortBy) {
            setSortOrder('asc');
            setSortBy(label);
        }
        else if(sortOrder === null){
            setSortOrder('asc');
            setSortBy(label);
        }
        else if(sortOrder === 'asc'){
            setSortOrder('desc');
            setSortBy(label);
        }
        else if (sortOrder === 'desc') {
            setSortOrder(null)
            setSortBy(null);
        }
    }

    const updatedConfig = config.map((col) => {
        if(!col.sortValue){
            return col;
        }
        return {
            ...col,
            header: () => (
                <th className="cursor-pointer hover:bg-gray-100 p-3" 
                    onClick={() => handleClick(col.label)}>
                    <div className="flex items-center">
                        {getIcons(col.label, sortBy, sortOrder)}
                        {col.label}
                    </div>
                </th>
            ),
        };
    });

    let sorted = data;
    if(sortBy && sortOrder){
        const {sortValue} = config.find(col => col.label === sortBy);
        sorted = [...data].sort((a,b) => {
            const valueA = sortValue(a);
            const valueB = sortValue(b);

            const reverseOrder = sortOrder === 'asc' ? 1 : -1;

            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB) * reverseOrder;
            } else {
                return (valueA - valueB) * reverseOrder;
            }
        });
        console.log(sorted);
    }

    //  MAKE SURE UPDATEDCONFIG GOES SECOND IN JSX to override the one in props
  return (<div>
        <Table  {...props} data = {sorted} config={updatedConfig}/> 
    </div>);
}

export default SortableTable;