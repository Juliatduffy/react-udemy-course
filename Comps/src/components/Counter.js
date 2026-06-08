import useSomething from '../hooks/use-something';

function Counter({initialValue}) {

    const {count, handleClick} = useSomething(initialValue);

    return (
        <div>
            <p>Counter: {count}</p>
            <button className="mt-5 p-2 border bg-blue-200" onClick = {handleClick}>Increment Count</button>
        </div>
    );
}
export default Counter;