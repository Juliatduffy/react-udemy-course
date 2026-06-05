import SearchBar from "./components/SearchBar";
import searchImages from './api';
import ImageList from './components/ImageList';
import {useState} from 'react';
function App() {
    const [images, setImages] = useState([]);

    const handleSubmit = async (word) => {
        const result = await searchImages(word);
        setImages(result);
    }

    return (
        <div> 
            <SearchBar onSubmit={handleSubmit} >Hi!</SearchBar>
            <ImageList images={images} />
        </div>
    );
}

export default App;