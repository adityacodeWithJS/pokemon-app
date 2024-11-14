import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';
import Login from "../Login";
import { printName } from "../utils/printName";
describe('Login Form', () => {
    test('input', () => {
       const loginComponent= render(<Login />)
      // expect(loginComponent).toMatchSnapshot()
        const loginText = screen.getByText(/login/i)
        const inputEmail = screen.getByRole("textbox");
        const checkPlaceholder = screen.getByPlaceholderText("Enter email")
        expect(loginText).toBeInTheDocument()
        expect(inputEmail).toBeInTheDocument();
        expect(checkPlaceholder).toBeInTheDocument();
        expect(inputEmail).toHaveAttribute('name', 'email')
        expect(inputEmail).toHaveAttribute('id', 'userEmailId')
    
        //expect(inputEmail).toHaveAttribute('value','aditya@gmail.com')
    })

    test('Change Event', () => {
        render(<Login />)
        let inputChange = screen.getByRole("textbox");
        const inputElement = inputChange as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'aditya' } })
        expect(inputElement.value).toBe('aditya')
    })

    test('click event',()=>{
        render(<Login />)
        const btn2= screen.getByRole("button",{name:"Click"});
        const btn= screen.getByRole("button",{name :'Update Button'});
        expect(btn2).toBeInTheDocument()
        fireEvent.click(btn)
        // fireEvent.click(btn2)
        expect(screen.getByText("Update Button")).toBeInTheDocument()
    })
    test('Functional Test',()=>{
     expect(printName()).toMatch('Aditya')
    })

    test('customRole',()=>{
        render(<Login />)
        const dv1= screen.getByRole('loginForm')
        expect(dv1).toBeInTheDocument()
    })
    
    test('inputLabel',()=>{
        render(<Login/>)
        const input1 = screen.getByRole('textbox',{name:"userName"})
         expect(input1).toBeInTheDocument()
    
    })
})
