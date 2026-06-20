import { useSelector, useDispatch } from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import { removeCar } from '../store';

// Derived state means using two pieces of state to compute a new value, 
// in this case filtering the list of cars based on the search term.
//
// createSelector is used to memoize the derived state, so the filtered 
// list of cars is only recalculated when the relevant pieces of state change.
const memoizedCars = createSelector(
  [(state) => state.cars.data, (state) => state.cars.searchTerm],
  (data, searchTerm) =>
    data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(memoizedCars);
  const name = useSelector((state) => state.form.name); 

  
  const handleCarDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  const renderedCars = cars.map((car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());
    return (
      <div key={car.id} className="panel">
        <p>
          {bold ? <b>{car.name}</b> : car.name} - ${car.cost}
        </p>
        <button
          className="button is-danger"
          onClick={() => handleCarDelete(car)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

export default CarList;
