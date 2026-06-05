import {useState, useContext} from 'react';
import BookEdit from './BookEdit';
import useBooksContext from '../hooks/useBooksContext';

function BookShow({book}) {
    const [showEdit, setShowEdit] = useState(false);
    const{deleteBookById} = useBooksContext;
    
    const handleDeleteClick = () => {
        deleteBookById(book.id);
    }
    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = () => {
        setShowEdit(false);
    }

    let content = <h3>{book.title}</h3>;
    if(showEdit) {
        content = <BookEdit onSubmit={handleSubmit} book={book}/>;
    }

    return (
        <div className= "book-show" >
            <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
            {content}
            <div className="actions">
            <button className="delete" onClick={handleDeleteClick}>
                Delete
            </button>
            <button className="edit" onClick={handleEditClick}>
                Edit
            </button>
            </div>
        </div>
    );
}
export default BookShow;