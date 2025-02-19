import React from 'react';
import '@testing-library/jest-dom'; 
import { render,screen } from "@testing-library/react"
import {CounterTwo } from "../Hello"
import user from '@testing-library/user-event'

describe ("CounterHi",()=>{
    // const mockProps ={
    //     count:5,
    //     handleIncrement?:jest.fn(),
    //     handleDecrement?:jest.fn()
    // }
    test ("renders correctly",()=>{
        render (<CounterTwo count={0}  handleDecrement={()=>{}} handleIncrement={()=>{}} />)
        const textElement=screen.getByTestId('counter-text');
       // const textElement = screen.getByText("Counter Two");
       expect(textElement).toBeInTheDocument();
       //expect(textElement).toHaveTextContent('Counter Two');
    })

    test("handlers are called", async()=>{
        const incrementHandlres=jest.fn()
        const decrementHandlres=jest.fn()
        render (<CounterTwo count={0}
        handleIncrement={incrementHandlres}
        handleDecrement={decrementHandlres}
        />)
         // Get buttons
         const incrementBtn = screen.getByRole("button", { name: 'Increment' });
         const decrementBtn = screen.getByRole("button", { name: 'Decrement' });
        await  user.click(incrementBtn)
        await user.click(decrementBtn)
        expect(incrementHandlres).toHaveBeenCalledTimes(1)
        expect(decrementHandlres).toHaveBeenCalledTimes(1)

    })
})