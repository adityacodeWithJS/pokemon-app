import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const incrementHandler = () => {
    setCount(count + 1);
  };

  const decrementHandler = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2 data-testid="counter-value">Count: {count}</h2>
      <button 
        data-testid="increment-button" 
        onClick={incrementHandler}
      >
        Increment
      </button>
      <button 
        data-testid="decrement-button" 
        onClick={decrementHandler}
      >
        Decrement
      </button>
    </div>
  );
};

export default Counter;
