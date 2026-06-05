import {useState, useContext} from 'react'
import useBooksContext from '../hooks/useBooksContext';

function BookEdit({book, onSubmit}) {
    const {editBookById} = useBooksContext;

    const [title, setTitle] = useState(book.title);

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit();
        editBookById(book.id, title);

    }
    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    return (
    <div>
        <form className="book-edit" onSubmit = {handleSubmit} >
        <input className="input" value={title} onChange={handleChange}
            />
        <button className="button is-primary">
            Save
        </button>
        </form>
    </div>
    );
}
export default BookEdit;