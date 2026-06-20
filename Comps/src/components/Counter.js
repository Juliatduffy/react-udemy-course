import {useReducer} from 'react';
import Button from './Button';
import {produce} from 'immer';

const INCREMENT_COUNT = 'increment';
const SET_VALUE_TO_ADD = 'change_value_to_add';
const DECREMENT_COUNT = 'decrement';
const ADD_VALUE_TO_COUNT = 'add_value';

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT: 
    return {
      ...state, 
      count: state.count + 1,
    };

  case DECREMENT_COUNT:
    state.count = state.count - 1; // immer example
    return;
  
  case ADD_VALUE_TO_COUNT:
    return {
      ...state, // even though we already overwrite all of state we do thius for future proofing
      count: state.count + state.valueToAdd,
      valueToAdd: 0,
    };
  
  case SET_VALUE_TO_ADD:
    return {
      ...state,
      valueToAdd: action.payload,
    };
  }

  return state;
};

function Counter({initialValue}) {

    const [state, dispatch] = useReducer(produce(reducer), {
        count: initialValue,
        valueToAdd: 0,
    });

    const handleIncrement = () => {
        dispatch({type:INCREMENT_COUNT});
    }
    
    const handleDecrement = () => {
         dispatch({type:DECREMENT_COUNT});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({
        type: ADD_VALUE_TO_COUNT,
        });
    };

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value) || 0;

        dispatch({
        type: SET_VALUE_TO_ADD,
        payload: newValue,
        });
    }

    return (
        <div>
            <p>Counter: {state.count}</p>
            <Button secondary outline onClick = {handleIncrement}>Increment Count</Button>
            <Button secondary outline onClick = {handleDecrement}>Decrement Count</Button>
            <form onSubmit={handleSubmit}>
                <label>Add a set amount:</label>
                <input 
                value={state.valueToAdd || ""}
                type="number"
                onChange={handleChange}/>
                <Button primary >
                Submit
                </Button>
            </form>
        </div>
    );
}
export default Counter;