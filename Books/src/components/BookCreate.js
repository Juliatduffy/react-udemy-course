import {useState, useContext} from 'react';
import useBooksContext from '../hooks/useBooksContext';

function BookCreate() {
    const [inputValue, setInputValue] = useState("");
    const {createBook} = useBooksContext;

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createBook(inputValue);
        setInputValue("");
    }

    return (
        <div className ="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className ="input" type = "text" value={inputValue} onChange={handleChange}/>
                <button className ="button">  Create</button>
            </form>
        </div>
    );
}
export default BookCreate;