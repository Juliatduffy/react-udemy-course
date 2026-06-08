import Dropdown from "../components/Dropdown";
import {useState} from 'react';

function DropdownPage(){

  const[selection, setSelection] = useState(null);
  
  const handleSelect = (option) => {
        setSelection(option);
        console.log('selected value: ' + option.value);
    }

  const options = [
    {label: 'Red', value:'red'},
    {label: 'Green', value:'green'},
    {label: 'Blue', value:' blue'},
  ]
  return <Dropdown selection={selection} onSelect={handleSelect} options = {options}/>
}

export default DropdownPage;