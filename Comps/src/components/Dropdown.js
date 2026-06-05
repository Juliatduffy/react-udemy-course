import {useState, useEffect, useRef} from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

function Dropdown({options, selection, onSelect}) {

    const[isOpen, setIsOpen] = useState(false);
    const dropdownEl = useRef();
    
    useEffect(() => {
        const handler = (e) => {
            if(!!dropdownEl){
                return;
            }
            if(!dropdownEl.current.contains(e.target)){
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handler, true);
        return () => {
            document.removeEventListener('click', handler);
        };

    }, [])

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOption = (option) => {
        setIsOpen(false);
        onSelect(option);
    }

    const renderedOptions = options.map((option) => {
        return <div className="hover:bg-sky-100 rounded cursor-pointer p-1" onClick={()=> handleClickOption(option)} key={option.value}>{option.label}</div>
    });

    return(
            <div ref={dropdownEl} className="w-48 relative">
                <Panel 
                    className="flex justify-between items-center cursor-pointer " 
                    onClick={handleOpenMenu}>
                    {selection?.label || 'Select...'}
                    <GoChevronDown className="text-lg" />
                </Panel>
                {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
            </div>
        );
}
export default Dropdown;