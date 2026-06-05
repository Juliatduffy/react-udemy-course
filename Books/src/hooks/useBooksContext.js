import BooksContext from '../context/books';
import {useContext} from 'react';

function useBooksContext() {
    return useContext(BooksContext);
}

export default useBooksContext;