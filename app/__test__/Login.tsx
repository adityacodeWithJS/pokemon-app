import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';
import Login from "../Login";

describe('Login Form', () => {
    test('Login Form', () => {
       const loginComponent= render(<Login />)
       expect(loginComponent).toMatchSnapshot()
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
        const btn= screen.getByRole("button");
        fireEvent.click(btn)
        expect(screen.getByText("Update Button")).toBeInTheDocument()
    })
})
