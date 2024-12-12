import React from 'react';
import '@testing-library/jest-dom'; 
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '../Counter';

describe ('Counter Component Render',()=>{
    test('should render the counter with initial value of 0', () => {
        render(<Counter />);
    
        // Check that the counter is rendered with an initial value of 0
        const counterElement = screen.getByTestId('counter-value');
        expect(counterElement).toHaveTextContent('Count: 0');
      });

      test ('increments the counter value when the increments button is clicked',()=>{
        render(<Counter/>)
        fireEvent.click(screen.getByTestId('increment-button'))
        expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: 1');
      })

      test ('decrements the counter value when the decrements button is clicked', ()=>{
        render(<Counter/>)
        fireEvent.click(screen.getByTestId('decrement-button'))
        expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: -1');
      })
})