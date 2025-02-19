import { render, screen, fireEvent } from '@testing-library/react';
import { RegistrationForm } from '../RegForm';
import React from "react";
import '@testing-library/jest-dom';


describe('RegistrationForm', () => {

    test('renders form fields and submit button', () => {
        render(<RegistrationForm />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('shows error when fields are empty on submit', () => {
        render(<RegistrationForm />);

        const submitButton = screen.getByTestId('submit-button');

        // Submit the form without filling out any fields
        fireEvent.click(submitButton);

        // Error message should be shown
        expect(screen.getByTestId('error-message')).toHaveTextContent('All fields are required.');
    });
    test('successfully submits the form when all fields are filled', () => {
        render(<RegistrationForm />);

        // Get form fields and submit button
        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        // Fill in valid data for all fields
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(submitButton);

        // Check that no error message is displayed
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('shows error message when email is invalid', () => {
        render(<RegistrationForm />);

        // Get form fields and submit button
        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        // Fill the fields with invalid email
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example' } }); // Invalid email format
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(submitButton);

        // Check for the error message about invalid email
        expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter a valid email address.');
    });
    test('shows error message when any field is missing', () => {
        render(<RegistrationForm />);

        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        // Fill the fields with missing email
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(submitButton);

        expect(screen.getByTestId('error-message')).toHaveTextContent('All fields are required.');
    });
})