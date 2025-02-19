type CounterTwoProps = {
    count:number;
    handleIncrement?:()=>void;
    handleDecrement?:()=>void;
}

import React from 'react';

export const CounterTwo = (props:CounterTwoProps) => {
 return (
    <div>
        <h1 data-testid="counter-text">Counter Two</h1>
        <p>{props.count}</p>
        {
            props.handleIncrement && (
                <button onClick={props.handleIncrement}>Increment</button>
            )
        }
        {
            props.handleDecrement && (
                <button onClick={props.handleDecrement}>Decrement</button>
            )
        }
    </div>
 )
}
