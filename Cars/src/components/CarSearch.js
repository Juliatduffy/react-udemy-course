import { useSelector, useDispatch } from 'react-redux';
import { changeSearchTerm } from '../store'; 

function CarSearch() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.cars.searchTerm);
  const handleSearchTermChange = (event) => {
    dispatch(changeSearchTerm(event.target.value));
  };
  return <div className ="list-header">
    <h3 className="title is-3">Search</h3>
    <div className="Searc field is-horizontal">
      <label className="label">Search</label>
      <input className="input" 
      value = {searchTerm}
      onChange = {handleSearchTermChange} />
    </div>
  </div>;
}

export default CarSearch;
