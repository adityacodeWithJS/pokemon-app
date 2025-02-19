import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../LoginPage';
import React from "react";
import '@testing-library/jest-dom';

describe('LoginPage', () => {
    test('renders form fields and submit button', () => {
        render(<LoginPage />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('shows error when credentials are invalid', () => {
        render(<LoginPage />);

        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);

        expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email or password');
    });

    test('redirects to home page when login is successful', () => {
        render(<LoginPage />);

        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        // Check that the HomePage component is displayed after successful login
        expect(screen.getByText('Welcome to the Home Page')).toBeInTheDocument();
    });
});
