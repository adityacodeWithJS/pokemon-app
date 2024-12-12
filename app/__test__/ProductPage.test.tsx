import { render, screen, fireEvent } from '@testing-library/react';
import ProductPage from '../ProductPage';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';
import React from "react";
// Mock the next/router module
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ProductPage', () => {
  it('should display the product id from the query string', () => {
    // Correct the method name to mockReturnValue
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '123' },
    });

    render(<ProductPage />);

    // Assert that the product id is rendered correctly
    expect(screen.getByText('Product ID: 123')).toBeInTheDocument();
  });

  it('should navigate to the home page when "Go to Home" button is clicked', () => {
    const push = jest.fn();  // Mock the router push method
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '123' },
      push,  // Mock the push method of the router
    });

    render(<ProductPage />);

    // Click the "Go to Home" button
    fireEvent.click(screen.getByText('Go to Home'));

    // Assert that the push function was called with the correct argument
    expect(push).toHaveBeenCalledWith('/');
  });
});
