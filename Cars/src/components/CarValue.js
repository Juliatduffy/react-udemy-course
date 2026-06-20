import {useSelector} from 'react-redux';


function CarValue() {
  const totalCost = useSelector(({cars: {data, searchTerm}}) => {
    const filteredCars = data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // the reduce function works by iterating over each car in the filteredCars array,
    // accumulating the total cost by adding each car's cost to the running total.
    return filteredCars.reduce((total, car) => total + car.cost, 0);
  });
  return <div className="car-value">Total Cost: ${totalCost}</div>;
}

export default CarValue;
