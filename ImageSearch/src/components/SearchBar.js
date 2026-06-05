import {useState} from 'react'
import './SearchBar.css'

function SearchBar({onSubmit}) {
    const [term, setTerm] = useState('cars');
    const handleFormSubmit = () => {
        event.preventDefault();
        onSubmit(term);
    }
    const handleChange = (event) => {
        setTerm(event.target.value);
    }
    return(
        <div className="search-bar">
            <form onSubmit={handleFormSubmit} >
                <div>Search For Images</div>
                <input value={term} onChange={handleChange}/>
            </form>
        </div>
    );
}

export default SearchBar;