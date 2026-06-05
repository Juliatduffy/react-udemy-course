import {useState} from 'react';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function Accordion({items}) {

    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleClick = (id) => {
        setExpandedIndex(expandedIndex === id ? -1 : id);
    };

    const renderedItems = items.map((item) => {
        return (
            <div key= {item.id} >
                <div className="flex p-3 bg-gray-50 border-b items-center cursor-pointer " onClick={() => handleClick(item.id)}>
                    {item.label}
                    {item.id === expandedIndex && <CiCircleMinus className="ml-3"/>}
                    {item.id !== expandedIndex && <CiCirclePlus className="ml-3"/>}
                </div>
                    {item.id === expandedIndex && <div className="border-b p-5">{item.content}</div>}
            </div>
        );
    });

    return <div className="border-x border-t rounded" >{renderedItems}</div>
}
export default Accordion;