import {useEffect, useState } from 'react';

function useSomething(initialValue) {
    const[count, setCount] = useState(initialValue ?? 0);

    useEffect(() => {
        console.log(count);
    }, [count]);

    const handleClick= () =>{
        setCount(count + 1);
    }
    return {
        count,
        handleClick,
    };
};

export default useSomething;